<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\OfUsers;
use App\OfCompany;
use Illuminate\Support\Facades\Hash;
use Redirect, Input, Auth;
use App\PushMessage;

class OfUserController extends Controller
{
    //管理员注册
    public function Register(Request $request)
    {
        $usermobile = $request->input('usermobile');
        $userpassword = Hash::make($request->input('userpassword'));
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
    //添加用户信息
    public  function AddUser($value='')
    {
        echo session('userid');
    }




}
