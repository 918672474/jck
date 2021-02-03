/**
 * Created by jck on 2018/11/5
 */
import axios from 'axios';
import { message } from 'antd';

function UrlSearch() {
    var name,value;
    var str = window.location.href; //取得整个地址栏
    var num = str.indexOf("?")
    str = str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
    var arr = str.split("&"); //各个参数放到数组里
    for(var i=0; i < arr.length; i++){
        num = arr[i].indexOf("=");
        if(num > 0){
            name = arr[i].substring(0,num);
            value = arr[i].substr(num+1);
            this[name] = value;
        }
    };
};

var Request = new UrlSearch(); //实例化

// 获取code
if(Request.code){
    if(sessionStorage.getItem("Code") === Request.code) {
        sessionStorage.setItem("inform", 0);
    } else {
        sessionStorage.setItem("inform", 1);
    }
    sessionStorage.setItem('Code', Request.code);
};
let Code = sessionStorage.getItem("Code");


let Url = "";                                //api地址
let beeUrl = "";                             //bee小蜜蜂后端域名
let beeAlarmUrl = "";                        //数字化运维地址
let hippoUrl = "";                           //河马数据库项目地址
let spiderUrl = "";                          //蜘蛛工单项目地址
let loginUrl = "";                           //登录地址
let layoutUrl = "";                          //退出地址

// process.env.API_ENV   环境变量
//bee平台后端地址---sit
if(process.env.API_ENV === "sit") {
    Url = "http://10.88.26.187:6789/"; 
    beeUrl = "http://10.88.26.187:8001/";
    beeAlarmUrl = "http://devops-webshell-sandbox.baozun.com/webshell/";
    hippoUrl = "http://10.88.27.172:8000/#/";
    spiderUrl = "http://10.88.26.187:8003/";
    loginUrl = "http://test.account.baozun.cn/person/login?appkey=dev-ym";
    layoutUrl = "http://test.account.baozun.cn/person/logout?appkey=dev-ym";
};
//bee蜜蜂平台后端地址---uat
if(process.env.API_ENV === "uat") {
    // Url = "http://devops-bee-backend-uat.cloud.bz/";           //容器化地址
    Url = "http://bee-backend-uat.cloud.bz/";
    beeUrl = "http://bee-uat.cloud.bz/";
    beeAlarmUrl = "http://devops-webshell-sandbox.baozun.com/webshell/";
    hippoUrl = "http://10.88.27.172:8000/#/";
    spiderUrl = "http://devops-spider-frontend-uat.cloud.bz/";
    loginUrl = "http://ecs-uat-account.baozun.com/person/login?appkey=uat-ym";
    layoutUrl = "http://ecs-uat-account.baozun.com/person/logout?appkey=uat-ym";
};
//bee蜜蜂平台后端地址---sandbox
if(process.env.API_ENV === "sandbox") {
    Url = "http://devops-bee-backend-uat.cloud.bz/";           //容器化地址
    beeUrl = "http://devops-bee-frontend-sandbox.cloud.bz/";
    beeAlarmUrl = "http://devops-webshell-sandbox.baozun.com/webshell/";
    hippoUrl = "http://10.88.27.172:8000/#/";
    spiderUrl = "http://devops-spider-frontend-uat.cloud.bz/";
    loginUrl = "http://ecs-uat-account.baozun.com/person/login?appkey=sandbox-ym";
    layoutUrl = "http://ecs-uat-account.baozun.com/person/logout?appkey=sandbox-ym";
};
//bee蜜蜂平台后端地址---prod
if(process.env.API_ENV === "prod") {
    Url = "http://bee-backend.baozun.com/";
    beeUrl = "http://bee.baozun.com/";
    beeAlarmUrl = "http://bee-backend.baozun.com/webshell/";
    hippoUrl = "http://hippo.baozun.com/#/";
    spiderUrl = "http://spider.baozun.com/";
    loginUrl = "https://account.baozun.com/person/login?appkey=pro-ym";
    layoutUrl = "https://account.baozun.com/person/logout?appkey=pro-ym";
};


if(window.location.href !== "http://bee.baozun.com/loginBee"){
    if(Code){
        console.log("宝尊运维平台")
    }
}


export function requestNormala(path, method, options) {
    return axios({
        url: Url + path +"?code="+ Code,
        method: method,
        params: options,
        validateStatus: function (status) {
            return status <= 500;
        }
    }).then(function (response) {
        if(200 <= response.status && response.status <= 300){
            if(Number(response.data.code) === 5){
                window.location.href = `${Url}loginagain/?code=${Code}`;
            }else if(Number(response.data.code) === 11){
                message.destroy();
                message.warning("权限不足,请联系相关人员", 1);
            };
            return response;
        };
    }).catch(function (error) {
        return error;
    });
};

export function requestNormalb(path, method, options) {
    return axios({
        url: Url + path +"?code="+ Code,
        method: method,
        data: options,
        validateStatus: function (status) {
            return status <= 500;
        }
    }).then(function (response) {
        if(200 <= response.status && response.status <= 300){
            if(Number(response.data.code) === 5){
                window.location.href = `${Url}loginagain/?code=${Code}`;
            }else if(Number(response.data.code) === 11){
                message.destroy();
                message.warning("权限不足,请联系相关人员", 1);
            };
            return response;
        };
    }).catch(function (error) {
        return error;
    });
};

export function requestNormalc(urlurl, path, method, options, params) {
    return axios({
        url: urlurl + path +"?code="+ Code,
        method: method,
        data: options,
        params: params,
        validateStatus: function (status) {
            return status <= 500;
        }
    }).then(function (response) {
        if(200 <= response.status && response.status <= 300){
            if(Number(response.data.code) === 5){
                window.location.href = `${Url}loginagain/?code=${Code}`;
            }else if(Number(response.data.code) === 11){
                message.destroy();
                message.warning("权限不足,请联系相关人员", 1);
            };
            return response;
        };
    }).catch(function (error) {
        return error;
    });
};

export function requestNormalf(url, path, method, options) {
    return axios({
        url: url + path,
        method: method,
        params: options,
        validateStatus: function (status) {
            return status <= 500;
        }
    }).then(function (response) {
        if(200 <= response.status && response.status <= 300){
            if(Number(response.data.code) === 5){
                window.location.href = `${Url}loginagain/?code=${Code}`;
            }else if(Number(response.data.code) === 11){
                message.destroy();
                message.warning("权限不足,请联系相关人员", 1);
            };
            return response;
        };
    }).catch(function (error) {
        return error;
    });
}

export function requestNormalFile(path, method, params, data) {
    return axios({
        url: Url + path +"?code="+ Code,
        method: method,
        params: params,
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        validateStatus: function (status) {
            return status <= 500;
        },
    }).then(function (response) {
        if(200 <= response.status && response.status <= 300){
            if(Number(response.data.code) === 5){
                window.location.href = `${Url}loginagain/?code=${Code}`;
            }else if(Number(response.data.code) === 11){
                message.destroy();
                message.warning("权限不足,请联系相关人员", 1);
            };
            return response;
        };
    }).catch(function (error) {
        return error;
    });
};

export { Code, Url, beeUrl, beeAlarmUrl, hippoUrl, spiderUrl, loginUrl, layoutUrl };
