<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\OfGroup;
use App\OfPost;
use App\Http\Requests;

class OfGroupController extends Controller
{
    //公司组织结构
    public function AddGroup(Request $request)
    {
    	
        $id = $request -> input('id');
        if($id)
        {
            $addgroup= OfGroup::find($id);//编辑

        }else{
            $addgroup = new OfGroup;//新增
        }
    	$addgroup->groupname = $request->input('groupname');
    	$addgroup->pid = $request->input('pid');
    	$addgroup->grouprank = $request->input('grouprank')+1;
    	$addgroup->created_at=time();
    	$addgroup->created_by=max(session('userid'),1);
    	$addgroup->companyid = max(session('companyid'),1);
    	$addgroup->save();
    	if($addgroup)
    	{
    		return "success";
    	}else{
    		return "fail";
    	}
    }
    //公司组织数据接口
    public function ListGroup()
    {
    	$userid = max(session('userid'),1);
    	$showgroup = OfGroup::where('created_by',$userid)->get();
    	if($showgroup)
    	{
    		return json_encode($showgroup);
    	}
    }
    //组织机构编辑
    public function ShowGroup($id='')
    {
        $editgroup = OfGroup::find($id);
        if($editgroup)
        {
            return json_encode($editgroup);
        }
    }
    //组织结构删除
    public function DelGroup($id='')
    {
        $delgroup = OfGroup::where('id',$id)->delete();
        if($delgroup)
        {
            return "success";
        }else{
            return "fail";
        }
    }

    //职务添加
    public function AddPost(Request $request)
    {
        $id = $request -> input('id');
        if($id)
        {
            $addpost= OfPost::find($id);//编辑

        }else{
            $addpost = new OfPost;//新增
        }
        $addpost->postname = $request->input('postname');
        $addpost->created_at=time();
        $addpost->created_by=max(session('userid'),1);
        $addpost->companyid = max(session('companyid'),1);
        $addpost->save();
        if($addpost)
        {
            return "success";
        }else{
            return "fail";
        }
    }

    //职务显示
    public function ShowPost()
    {
        $showpost = OfPost::get();
        if($showpost)
        {
            return json_encode($showpost);
        }
    }

    //职务删除
    public function DelPost($id='')
    {
        $delpost = OfPost::where('id',$id)->delete();
        if($delpost)
        {
            return "success";
        }else{
            return "fail";
        }
    }

}
