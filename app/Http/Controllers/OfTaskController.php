<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\OfTask;
use App\Upload;
use App\PushMessage;
use zgldh\UploadManager\UploadManager;

class OfTaskController extends Controller
{
	//上传附件
	public function UploadFiles(Request $request)
	{
		///上传附件
		$wk_file='';
    	$file = $request ->file('taskfile');
        $manager = UploadManager::getInstance();
        $upload = $manager->withValidator('image')->upload($file);    //加上验证组
        //$upload = $manager->upload($file); 
        if($upload)
        {
            $upload->save();
            //return $upload;
            $wk_file = session('taskfile').','.$upload['id'];
            session(['taskfile'=>$wk_file]);
            return json_encode(session('taskfile'));
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
	//新增或编辑任务
	public function AddTask(Request $request)
	{
	    //发布任务
	    $id = $request->input('id');
	    if($id)
	    {
	    	$addtask = OfTask::find($id);
	    }else{
	    	$addtask = new OfTask;
	    }
	    $addtask->taskname = $request->input('taskname');
	    $addtask->taskdescription = $request->input('taskdescription');
	    $addtask->taskfile = session('taskfile');
	    $addtask->leaderid = $request->input('leaderid');
	    $addtask->itemid = $request->input('itemid');
	    $addtask->attendid = implode(",",($request->input('attendid'))).",";
	    $addtask->finishtime = strtotime($request->input('finishtime'));
	    $addtask->tasktype = $request->input('tasktype');
	    $addtask->created_at = time();
	    $addtask->created_by = session('userid');
	    $addtask->companyid = session('companyid');
	    $addtask->save();
	    if($addtask)
	    {
	    	return "success";
	    }else{
	    	return "fail";
	    }
    }
    //显示我负责的任务
    public function ImLeaderid(Request $request)
    {
    	$leaderid = session('userid');
    	$imleaderid = OfTask::where('leaderid',$leaderid)->orderBy('id','DESC')->get();
    	if($imleaderid)
    	{
    		return json_encode($imleaderid);
    	}
    }
    //显示我参与的任务
    public function ImAttendid(Request $request)
    {
    	$attendid = session('userid');
    	$imattendid = OfTask::where('attendid','like','%'.$attendid.',%')->orderBy('id','DESC')->get();
    	if($imattendid)
    	{
    		return json_encode($imattendid);
    	}
    	
    }
    //我分配的任务
    public function ImAddTask($value='')
    {
        $imaddtask = OfTask::where('created_by',$session('userid'))->get();
        if($imaddtask)
        {
            return json_encode($imaddtask);
        }
    }
    //显示任务
    public function ShowTask($id='')
    {
    	$showtask = OfTask::where('id',$id)->first();
    	if($showtask)
    	{
    	   return json_encode($showtask);
    	}
    }




 
}
