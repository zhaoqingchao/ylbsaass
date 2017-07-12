<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\OfWork;
use App\OfGroup;
use App\OfWorkComment;
use App\Http\Requests;
use zgldh\UploadManager\UploadManager;
use App\Upload;
use App\PushMessage;


class OfWorksController extends Controller
{
	//上传附件
	public function UploadFiles(Request $request)
	{
		///上传附件
		$wk_file='';
    	$file = $request ->file('wk_file');
        $manager = UploadManager::getInstance();
        $upload = $manager->withValidator('image')->upload($file);    //加上验证组
        //$upload = $manager->upload($file); 
        if($upload)
        {
            $upload->save();
            //return $upload;
            $wk_file = session('wk_file').','.$upload['id'];
            session(['wk_file'=>$wk_file]);
            return json_encode(session('wk_file'));
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
    //新增工作汇报
    public function AddWork(Request $request)
    {
        //新增工作汇报
        $id = $request -> input('id');
        if($id)
        {
            $addwork = OfWork::find($id);//

        }else{
            $addwork = new OfWork;//
        }
    	$addwork->wk_type = $request -> input('wk_type');//1日报2周报3月报
    	$addwork->wk_date = strtotime($request -> input('wk_date'));
    	$addwork->wk_plan = $request -> input('wk_plan');
    	$addwork->wk_record = $request -> input('wk_record');
    	$addwork->wk_summary = $request -> input('wk_summary');
        $addwork->itemid = $request->input('itemid');
    	$addwork->wk_visual = implode(",",($request -> input('wk_visual'))).",";//序列化数组
    	$addwork->created_by = max(session('userid'),1);
    	$addwork->companyid = max(session('companyid'),1);
    	$addwork->created_at = time();
    	$addwork->status = $request -> input('status');
    	$addwork->wk_click = 0;
    	$addwork->wk_zan = 0;
    	$addwork->wk_file = session('wk_file');
    	$addwork->save();
    	if($addwork)
    	{
    		//发送消息通知
    		$wk_type = $request -> input('wk_type');
    		$week = mb_substr( "日一二三四五六",date("w"),1,"utf-8" );
		    switch ($wk_type) {
		    	case '1':
		    		$wk_type_name = "日报";
		    		break;
		    	case '2':
		    		$wk_type_name = "周报";
		    		break;
		    	case '3':
		    		$wk_type_name = "月报";
		    		break;
		    	
		    	default:
		    		# code...
		    		break;
		    }
		    $fromuserid = session('userid');
		    $wk_visual = $request -> input('wk_visual');
		    $arrlength=count($wk_visual);//数组长度
		    $pushit = new PUSHSDK();
            $comment = $fromuserid."-".date('Y年m月d日 H时i分s秒 星期').$week." 的工作".$wk_type_name;
            foreach ($wk_visual as $key => $value) {
            	$pushit->PushMessages($fromuserid,$value,$comment);
            }
    		//清楚文件session值
    		session(['wk_file' => '']);
    		return  "success";
    	}else{
    		return  "fail";
    	}	

    }
    //工作汇报数据接口
    public function ListWorks($page,$pagecount)
    {
    	$userid = max(session('userid'),1);
    	$offsetnum = ($page-1)*$pagecount;
    	$listworks = OfWork::where('created_by',$userid)
    	->orderBy('id','DESC')
    	->offset($offsetnum)
    	->limit($pagecount)
    	->get();
    	$cNum = count($listworks);//工作汇报记录
    	$pages = ceil($cNum/$pagecount);//页数
    	$data  = array('pages' => $pages, 'listworks' => $listworks, );
    	if($data)
    	{
    		return json_encode($data);
    	}
    }
    //工作汇报点赞
    public function DZan($id='')
    {
    	$dzan = OfWork::where('id',$id)->increment('wk_zan', 1);
    	if($dzan)
    	{
    		return json_encode($dzan);
    	}
    }
    //工作汇报详细
    public function ShowWorks($id='')
    { 
    	//点击量+1
    	$clickhit = OfWork::where('id',$id)->increment('wk_click', 1);
    	//显示详细信息
    	$showworks = OfWork::where('id',$id)->first();
    	if($showworks)
    	{
    		return json_encode($showworks);
    	}
    }
    //显示本工作汇报附件
    public function ShowFiles($id='')
    {
    	$showfiles = OfWork::where('id',$id)->first();
     	$filesarray = explode(',',$showfiles['wk_file']);
     	$fileslist = Upload::select('id','path')->whereIn('id',$filesarray)->get();
    	if($fileslist)
    	{
    		return json_encode($fileslist);
    	}
    }
 
    //删除工作汇报
    public function DelWorks($id='')
    {
    	$delworks = OfWork::where('id',$id)->delete();
    	if($delworks)
    	{
    		return "success";
    	}else{
    		return "fail";
    	}
    }
    //工作汇报评阅
    public function WorkComments($id='')
    {
    	$workcomments = new OfWorkComment;
    	$workcomments->wk_comment = $request->input('wk_comment');
    	$workcomments->created_at = time();
    	$workcomments->created_by = max(session('userid'),1);
    	$workcomments->companyid = max(session('companyid'),1);
    	$workcomments->status = 0;
    	$workcomments->wk_id = $id;
    	$workcomments->save();
    	if($workcomments)
    	{
    		return "success";
    	}
    }
    //显示工作汇报评论
    public  function ShowComments($id='')
    {
    	$showcomments = OfWorkComment::where('wk_id',$id)->orderBy('id','DESC')->get();
    	if($showcomments)
    	{

    		return json_encode($showcomments);

    	}
    }


    


}
