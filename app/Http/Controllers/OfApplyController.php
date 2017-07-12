<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\OfAppliesType;
use App\OfAppliesFlow;
use App\OfApply;
use App\Upload;
use App\PushMessage;
use zgldh\UploadManager\UploadManager;


class OfApplyController extends Controller
{
    //显示审批项目
    public function ListType()
    {
    	$listtype = OfAppliesType::get();
	    if($listtype)
	    {
	    	return json_encode($listtype);
	    }
    }

    //上传附件
	public function UploadFiles(Request $request)
	{
		///上传附件
		$files='';
    	$file = $request ->file('appliesfile');
        $manager = UploadManager::getInstance();
        $upload = $manager->withValidator('image')->upload($file);    //加上验证组
        //$upload = $manager->upload($file); 
        if($upload)
        {
            $upload->save();
            //return $upload;
            $files = session('files').','.$upload['id'];
            session(['files'=>$files]);
            return json_encode(session('files'));
        }
        else
        {
            $errorMessages = $manager->getErrors();                   //得到所有错误信息
            $errorMessage = $manager->getFirstErrorMessage();         //得到第一条错误信息
            //throw new \Exception($errorMessage);
            //echo $errorMessage;
            return "对不起，上传数据有问题！";
        }

	}


    //提交申请
    public function AddApplies(Request $request)
    {
    	$addapplies = new OfApply;
    	$addapplies->typeid = $request->input('typeid');
    	$addapplies->itemid = $request->input('itemid');
    	$addapplies->commente = $request->input('commente');
    	$addapplies->files = session('files');
    	$addapplies->created_at = time();
    	$addapplies->created_by = max(session('userid'),1);
    	$addapplies->companyid = max(session('companyid'),1);
    	$addapplies->status = 0;
    	$addapplies->save();
    	if($addapplies)
    	{
    		//
    		$appliesflow = new OfAppliesFlow;
    		$appliesflow->appid = $addapplies['id'];
    		$appliesflow->appliesid = $request->input('appliesid');
    		$appliesflow->created_by = max(session('userid'),1);
    		$appliesflow->save();

    		$touserid = $request->input('appliesid');
    		$fromuserid = session('userid');
    		$pushit = new PUSHSDK();
            $comment = "您有一条来自".$fromuserid."的申请需要处理。" ;
            $pushit->PushMessages($fromuserid,$touserid,$comment);

    		return "success";
    	}else{
    		return "fail";
    	}

    }

    //审批操作同意，不同意，转交
    public function AppliesFlow(Request $request)
    {
    	$appid = $request->input('appid');
    	$status = $request->input('status');
     	$data  = array('status' => $status , 'created_at'=>time(),'remark'=>$request->input('remark'));
    	$appliesflow = OfAppliesFlow::where('appid',$appid)->update($data);
    	//更新ylb_of_applies-》status状态
    	$updateapplies = OfApply::where('id',$appid)->update(['status'=>$status]);
    	if($appliesflow)
    	{
    		//查询信息推送给那个用户ID->touerid
    		$searchuserid = OfAppliesFlow::where('appid',$appid)->first();
    		$touserid =  $searchuserid['created_by'];
    		$fromuserid = session('userid');
    		$pushit = new PUSHSDK();
    		switch ($status) {
    			case '1':
    				$comment = "您的申请通过审批。" ;
    				break;
    			case '2':
    				$comment = "您的申请未通过审批。" ;
    				break;
    			case '3':
    				//转交到下一个环节进行审批（如报销-领导审批转交财务审批）
    				//转移要生成新的记录
    				$addapplies = new OfAppliesFlow;
    				$addapplies->appid = $appid;
    				$addapplies->created_at = time();
    				$addapplies->created_by = $searchuserid['created_by'];
    				$addapplies->passid = $searchuserid['appliesid'];
    				$addapplies->status = $status;
    				$addapplies->appliesid = $request->input('appliesid');
    				$addapplies->save();

    				$comment = "您的申请转交到。".$appliesflow['appliesid'] ;
    				break;
    			default:
    				# code...
    				break;
    		}
            $pushit->PushMessages($fromuserid,$touserid,$comment);
            return "success";
    	}

    }

    //显示我的申请
    public function MyApplies(Request $request,$typeid)
    {
    	$userid = max(session('userid'),1);
    	if($typeid != 0){
    		$where  = array('created_by' => $userid ,'typeid'=>$typeid);
    	}else{
    		$where  = array('created_by' => $userid  );
    	}
    	$myapplies = OfApply::where($where)->orderBy('id', 'DESC')->get();
    	if($myapplies)
    	{
    		return json_encode($myapplies);
    	}
    }
    //显示我的审批
    public function MyAppliesFlow(Request $request,$typeid)
    {
    	$userid = max(session('userid'),1);
    	if($typeid != 0){
    		$where  = array('of_applies_flows.appliesid' => $userid ,'of_applies.typeid'=>$typeid);
    	}else{
    		$where  = array('of_applies_flows.appliesid' => $userid  );
    	}
    	$myappliesflow = OfAppliesFlow::join('of_applies','of_applies_flows.appid','=','of_applies.id')
    	->where($where)
    	->orderBy('of_applies_flows.id','DESC')
    	->get();
    	if($myappliesflow)
    	{
    		return json_encode($myappliesflow);
    	}

    }
    //申请详细
   	public function ShowApplies($id='')
   	{
   		//基本信息
   		$showapplies = OfApply::where('id',$id)->first();
   		
   		//审批信息
   		$showappliesflow = OfAppliesFlow::where('appid',$id)->get();
   		$showapply  = array('applies' => $showapplies,'appliesflow' => $showappliesflow );
   		echo json_encode($showapply);

   	}
   	//催办申请事宜,催促最后一个环节的审批
   	public function UrgeApplies($id)
   	{
   		//获取最后一个审批环节的userID
   		$searchuserid = OfAppliesFlow::where('appid',$id)->orderBy('id','DESC')->first();
   		$touserid = $searchuserid['appliesid'];
   		//echo $touserid;
   		//发布催办消息
   		$fromuserid = max(session('userid'),1);
   		$comment = "您的审批尚未处理，请尽快处理。";
   		$pushit = new PUSHSDK();
   		$pushit->PushMessages($fromuserid,$touserid,$comment);
        return "success";

   	}

    

}
