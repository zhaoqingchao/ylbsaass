<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\OfUsers;
use App\OfCompany;
use Illuminate\Support\Facades\Hash;
use Redirect, Input, Auth;
use App\PushMessage;
use Flc\Alidayu\Client;
use Flc\Alidayu\App;
use Flc\Alidayu\Requests\AlibabaAliqinFcSmsNumSend;
use Validator;
use Captcha;
use Illuminate\Support\Facades\Session;


class OfUserController extends Controller
{
    //管理员注册
    public function Register(Request $request)
    {
        $usermobile = $request->input('usermobile');
        $userpassword = Hash::make($request->input('userpassword'));
        $verify_smscode = $request->input('code');//判断手机短信验证
        if($verify_smscode != session('verify_smscode'))
        {
            return "smscodeerror";die;
        }
        //判断手机号是否存在
        $whereuser = OfUsers::where('usermobile',$usermobile)->first();
        if($whereuser){
            return  "exist" ;
        }else{
            $companyname = $request->input('companyname');
            $created_at = time();
            //保存公司名称
            $companydata = new OfCompany;
            $companydata->companyname = $companyname;
            $companydata->created_at = $created_at;
            $companydata->save();
            //设置公司sessionID
            session(['companyid' => $companydata['id']]);
            //保存管理员信息
            $usertype = 1;//管理员用户
            $adduser = new OfUsers;
            $adduser->usermobile = $usermobile;
            $adduser->userpassword = $userpassword;
            $adduser->usertype = $usertype;
            $adduser->created_at = $created_at;
            $adduser->companyid = max(session('companyid'),1);
            $adduser->save();
            if($adduser)
            {
                //推送消息
                $fromuserid = $adduser->id;
                $touserid = $adduser->id;
                $comment = "欢迎使用园林帮管理平台，请登录";
                $pushit = new PUSHSDK();
                $pushit->PushMessages($fromuserid,$touserid,$comment);
                return "success";
            }

        }
    	
    }
    //管理员登录
    public function UserLogin(Request $request)
    {
        $usermobile = $request->input('usermobile');
        $userpassword = $request->input('userpassword');
        $userlogin = OfUsers::where('usermobile',$usermobile)->first();
        if($userlogin)
        {
            if(Hash::check($userpassword, $userlogin->userpassword))
            {
                //获取用userid
                session(['userid'=>$userlogin['id']]);
                //获取用户usermobile
                session(['usermobile'=>$userlogin['usermobile']]);
                //获取公司companyid
                session(['companyid'=>$userlogin['companyid']]);
                return redirect('/appmainhtml');
            }else{
                return "账号密码错误，重新登录";
            }
            
        }else{
            return "账号密码错误，重新登录";
        }
    }
    //添加员工用户信息
    public  function AddUser(Request $request)
    {
        echo session('userid');
        $adduser = O;

    }
    //阿里大鱼短信验证
    public function SendSms(Request $request)
    {
        $usermobile = $request->input('usermobile');
        $rules = ['captcha' => 'required|captcha'];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails())
        {
            return "codefail";die;
        }
        // 配置信息
        $config = [
            'app_key'    => env('ALIDAYU_APP_KEY'),
            'app_secret' => env('ALIDAYU_SECRETKEY'),
        ];
        $verify = rand(123456, 999999);
        $client = new Client(new App($config));
        $req    = new AlibabaAliqinFcSmsNumSend;

        $req->setRecNum($usermobile);
        $req->setSmsFreeSignName(env('ALIDAYU_SIGN'));
        $req->setSmsTemplateCode('SMS_13191874');
        $req ->setSmsParam(['code'=>"$verify",'minute'=>'10']);
 
        $resp = $client->execute($req);

        //print_r($resp);
        //print_r($resp->result->success);
        if($resp && isset($resp->result) && $resp->result->err_code==0 && $resp->result->success == 1) {
            session(['verify_smscode'=>$verify]);
          
            return 'success';
        }else{
            return 'fail';
        }
    }





}
