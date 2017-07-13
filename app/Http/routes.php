<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');//更换成登录界面userlogin
});
//

//新增工作汇报界面
Route::get('addworkhtml', function(){
	return view('addworkhtml');
});

//上传附件
Route::post('uploadfiles', 'OfWorksController@UploadFiles');
//新增工作汇报
Route::post('addwork', 'OfWorksController@AddWork');
//显示我的工作汇报列表
Route::get('listworks/{page}/{pagecount}', 'OfWorksController@ListWorks');
//工作汇报点赞
Route::get('dzan/{id}', 'OfWorksController@DZan');
//显示工作汇报附件接口
Route::get('showfiles/{id}', 'OfWorksController@ShowFiles');
//显示工作详细信息
Route::get('showworks/{id}', 'OfWorksController@ShowWorks');
//删除工作汇报
Route::get('delworks/{id}', 'OfWorksController@DelWorks');
//编辑工作汇报
//Route::post('editwork', 'OfWorksController@AddWork');
//工作汇报评阅
Route::post('workcomments', 'OfWorksController@workcomments');
//显示所有评阅
Route::get('showcomments/{id}', 'OfWorksController@ShowComments');
//消息推送机制
Route::get('pushmessage/{fromuserid}/{touserid}/{wk_type}', 'OfWorksController@PushMessages');



//公司组织结构
Route::get('addgrouphtml', function(){
	return view('addgrouphtml');
});
Route::get('editgrouphtml', function(){
	return view('editgrouphtml');
});
Route::post('addgroup', 'OfGroupController@AddGroup');
Route::get('listgroup', 'OfGroupController@ListGroup');
Route::get('showgroup/{id}', "OfGroupController@ShowGroup");
//Route::get('editgroup', 'OfGroupController@AddGroup');
Route::get('delgroup/{id}', 'OfGroupController@DelGroup');


//用户注册管理员
Route::get('registerhtml', function(){
	return view('registerhtml');
});
//用户登录界面
Route::get('userloginhtml', function(){
	return view('userloginhtml');
});
//跳转到应用主界面
Route::get('appmainhtml', function(){
	return view('appmainhtml');
});
Route::post('register', 'OfUserController@Register');
//管理员登录
Route::post('userlogin', 'OfUserController@UserLogin');
//Route::get('sendsms/{usermobile}/{verify_code}', 'OfUserController@SendSms');
Route::post('sendsms', 'OfUserController@SendSms');
//公司职务
Route::get('showposthtml', function(){
	return view('showposthtml');
});
Route::post('addpost', 'OfGroupController@AddPost');
//Route::post('editpost', 'OfGroupController@AddPost');
Route::get('showpost', 'OfGroupController@ShowPost');
Route::get('delpost/{id}','OfGroupController@DelPost');


//添加用户信息界面
Route::get('adduserhtml', function(){
	return view('adduserhtml');
});
Route::post('adduser', 'OfUserController@AddUser');



//任务管理
Route::post('addtask', 'OfTaskController@AddTask');
Route::get('imleaderid', 'OfTaskController@ImLeaderid');
Route::get('showtask/{id}', 'OfTaskController@ShowTask');
Route::get('imattendid', 'OfTaskController@ImAttendid');
Route::post('edittask', 'OfTaskController@AddTask');
Route::get('imaddtask', 'OfTaskController@ImAddTask');


//审批管理
Route::get('listtype', 'OfApplyController@ListType');//显示申请项目
Route::post('addapplies', 'OfApplyController@AddApplies');//新增申请
Route::post('appliesflow', 'OfApplyController@AppliesFlow');//审批申请
Route::get('myapplies/{typeid}', 'OfApplyController@MyApplies');
Route::get('myappliesflow/{typeid}','OfApplyController@MyAppliesFlow');
Route::get('showapplies/{id}', 'OfApplyController@ShowApplies');
Route::get('urgeapplies/{id}', 'OfApplyController@UrgeApplies');

//质量检查
Route::post('addinspecttype', 'OfInspectController@AddInspectType');//编辑新增
Route::post('addinspects', 'OfInspectController@AddInspects');//
Route::post('addinspectsitem', 'OfInspectController@AddInspectsItem');//
Route::get('showinspects/{$id}', 'OfInspectController@ShowInspects');
Route::get('listinspects', 'OfInspectController@ListInspects');

























