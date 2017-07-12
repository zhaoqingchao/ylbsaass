<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\OfInspectType;
use App\OfInspect;
use App\OfInspectsItem;
use App\OfInspectsModify;
use App\Upload;
use App\PushMessage;
use zgldh\UploadManager\UploadManager;


class OfInspectController extends Controller
{
	//新增编辑质量检查性质
	public function AddInspectType(Request $request)
	{
		$id = $request->input('id');
	    if($id)
	    {
	    	$addinspecttype = OfInspectType::find($id);
	    }else{
	    	$addinspecttype = new OfInspectType;
	    }
	    $addinspecttype->typename = $request->input('typename');
	    $addinspecttype->created_at = time();
	    $addinspecttype->created_by = session('userid');
	    $addinspecttype->companyid = session('companyid');
	    $addinspecttype->save();
	    if($addinspecttype)
	    {
	    	return "success";
	    }else{
	    	return "fail";
	    }
	}
	//上传附件
	public function UploadFiles(Request $request)
	{
		///上传附件
		$files='';
    	$file = $request ->file('files');
        $manager = UploadManager::getInstance();
        $upload = $manager->withValidator('image')->upload($file);    //加上验证组
        //$upload = $manager->upload($file); 
        if($upload)
        {
            $upload->save();
            //return $upload;
            $files = session('files').','.$upload['id'];
            session(['files'=>$files]);
            //return json_encode(session('files'));
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
    //新增质量检查
	public function AddInspects(Request $request)
	{
		//质量检查基本信息
		$id = $request->input('id');
	    if($id)
	    {
	    	$addinspects = OfInspect::find($id);
	    	$touserid = $request->input('touserid');
	    }else{
	    	$addinspects = new OfInspect;
	    }
		
		$addinspects->itemid = $request->input('itemid');
		$addinspects->companyid = max(session('companyid'),1);
		$addinspects->status = 0;
		$addinspects->typeid = $request->input('typeid');
		$addinspects->inspectdate = strtotime($request->input('itemid'));
		$addinspects->inspectuserid = implode(",",($request->input('inspectuserid'))).",";
		$addinspects->created_at = time();
		$addinspects->created_by = max(session('userid'),1);
		if($touserid)
		{
			$addinspects->touserid = implode(",",($request->input('touserid'))).",";
		}
		$addinspects->save();
	    if($addinspects)
	    {
	    	///点击增加项目结果保存并跳转
	    	session(['inspectid'=>$addinspects['id']]);
	    	session(['files'=>'']);
	    	//发送通知
	    	if($touserid)//选择通知人发送通知
			{
				$fromuserid = max(session('userid'),1);
				$arrlength=count($touserid);//数组长度
			    $pushit = new PUSHSDK();

	            $comment = $fromuserid."的质量检查结果已经通知给您。";

	            foreach ($wk_visual as $key => $value) {
	            	$pushit->PushMessages($fromuserid,$value,$comment);
	            }
			}
	    	return "success";
	    }else{
	    	return "fail";
	    }

	}
	//增加检测项目和结果
	public function AddInspectsItem(Request $request)
	{
		//检查项目及结果
		$addinspectitem = new OfInspectItem;
		$addinspectitem->inspectid = session('inspectid');
		$addinspectitem->inspectitem = $request->input('inspectitem');
		$addinspectitem->inspectresult = $request->input('inspectresult');
		$addinspectitem->inspectfiles = session('files');
 		$addinspectitem->status = $request->input('status');//0未处理1通过2警告3整改
		$addinspectitem->created_at = time();
		$addinspectitem->created_by = max(session('userid'),1);
		//存入整改信息，选择整改按钮，前端显示整改输入框
		$addinspectitem->modifyuserid = $request->input('modifyuserid');
		$addinspectitem->modifydate = strtotime($request->input('modifydate'));
		$addinspectitem->modifyclaim = $reuqest->input('modifyclaim');
		$addinspectitem->save();
	    if($addinspectitem)
	    {
	    	//更新of_inspects status 状态值整改
	    	$status = $request->input('status');
	    	if($status == 3)
	    	{
	    		$updatestatus = OfInspect::where('id',session('inspectid'))->update(['status' => 3]);
	    	}


	    	///点击增加项目结果保存并跳转.两个按钮”继续“，”返回跳转到编辑页面选择通知人“
 	    	session(['files'=>'']);
	    	return "success";
	    }else{
	    	return "fail";
	    }

	}
	//编辑显示质量检查//显示检查结果//显示选择通知人
	public function ShowInspects(Request $request , $id)
	{
		//显示基本信息
		$showinspects = OfInspect::where('id',$id)->first();
		if($showinspects)
		{
			//显示检查项目结果
			$showinspectsitem = OfInspectItem::where('inspectid',$id)->orderBy('id','DESC')->get();
			if($showinspectsitem)
			{
				$showinspectarray  = array('inspects' => $showinspects, 'inspectsitem'=>$showinspectsitem );
				return json_encode($showinspectarray);
			}
		}
	}
	//检查项目列表
	public function LisetInspects($value='')
	{
		# code...
	}




























}
