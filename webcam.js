(function(root, factory) {
    /* CommonJS */
    if (typeof exports == "object") module.exports = factory();
    /* AMD module */
    else if (typeof define == "function" && define.amd) define(factory);

    /* 修改: 将 wwclassName 改为元素标识 */
    else root.webcam = factory();
}(this, function() {
    // "use strict";

    /* 修改: 将 wwclassName 改为元素标识 */
    var wwclassName = /*INSBEGIN:WWCLSNAME*/
        "webcam"
    /*INSEND:WWCLSNAME*/
    ;

    // 有依赖资源使用本函数
    // 使用方式:
    //  - 将"插件名"设置为具体插件标识, 通常就是插件名称, 不可为中文. 如: swiper
    //  - 如libs中无该插件, 则申请添加该插件
    //  - 将"插件路径"设置为具体插件路径, 通常为js文件, 省略路径中, 开头的"/"和结尾的".js". 如: "/libs/qrcodejs/qrcode.js" 应写为 "libs/qrcodejs/qrcode"
    //  - require 函数第一个参数, 传入依赖资源数组. 通常为config中配置的`插件名`. 可能还包括css文件
    //   - css文件的格式, 以"css!"开头, 省略路径开头的"/"和路径结尾的".css". 如: "/libs/noty/lib/noty.css" 应写为 ""css!libs/noty/lib/noty""
    //  - require 函数第二个参数是个回调函数, 该函数可能会传入参数. 参数与前面数组位置对应. 如不清楚, 自行查阅 (requirejs)[http://requirejs.org/] 文档

    var loadDependence = function(fncallback) {
        // 本模板只支持一个依赖库，如果需要多个依赖库，需要改进。
        if (!window.wwload.webcamjs) {
            window.wwload.webcamjs = "wait";
            // requirejs.config({
            //   paths: {
            //     "webcam": "libs/webcamjs/webcam.min" // 示例: libs/qrcodejs/qrcode
            //   }
            // });
            require(["libs/webcamjs/webcam.min"], function(Webcam) {
                window.Webcam = Webcam;
                Webcam.setSWFLocation("/libs/webcamjs/webcam.swf");
                window.wwload.webcamjs = true;
                replace();
                fncallback();
            });
        } else if (window.wwload.webcamjs === "wait") {
            setTimeout(function() {
                loadDependence(fncallback);
            }, 100);
        } else {
            replace();
            fncallback();
        }

        function replace() {
            loadDependence = function(fncallback) {
                fncallback();
            };
        }
    };
    //
    // END: 加载依赖部分 


    // BEGIN: 元素首次初始化处理
    var init = function() {
        // 重写初始化函数
        init = function() {
            return true;
        };
        $.wwclass.addEvtinHandler(wwclassName, evtInHandler);

        // 如有初始化动作, 请在下方添加

    };
    // END: 元素首次初始化处理


    /*
     * @description 初始化每个元素
     * @param {jQuery object} $ele - 需要初始化的元素
     */
    //声明一个改变摄像头变量
    function webcamjs($ele, newValue) {
      
            var getmediaId = function(success, fail) { // 变为回调模式
                console.log("ios")
                var videomedia = [];
                var audiomedia = [];
                if (!getmediaId.catch) { // 缓存media检测的结果, 如果有缓存, 则直接使用缓存值. 如果没有则执行下方代码
                    try{
                    navigator.mediaDevices.enumerateDevices()
                        .then(function(devices) {
                            getmediaId.catch = {};
                            devices.forEach(function(device) {
                                if (device.kind == 'videoinput') {
                                    videomedia.push(device.deviceId);
                                }
                                if (device.kind == 'audioinput') {
                                    audiomedia.push(device.deviceId);
                                }
                            });
                            getmediaId.catch.video = videomedia;
                            getmediaId.catch.audio = audiomedia;
                            success(getmediaId.catch);
                        })
                        .catch(function(err) {
                            // return;
                            fail(err.name + ": " + err.message);
                            // console.log(err.name + ": " + err.message);
                        });
                           } catch (e) {
                            console.log("chucuo1")
            console.log(e);
        }
                } else {
                    success(getmediaId.catch);
                }
            };

            var promisifiedOldGUM = function(constraints) {
                // 第一个拿到getUserMedia，如果存在
                var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
                // 有些浏览器只是不实现它-返回一个不被拒绝的承诺与一个错误保持一致的接口
                if (!getUserMedia) {
                    console.log("chucuo2")
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser-getUserMedia是不是在这个浏览器实现'));
                }
                // 否则，调用包在一个旧navigator.getusermedia承诺
                return new Promise(function(resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            };
            // 使用方式
            // var valuenum = $ele.attr("data--changeCamera"); //针对手机而言,0为前置,1为后置     data--changeCamera      
            var camera, videoarr = [],
                valuenum = newValue;
            audioarr = [];
            getmediaId(function(mediaArr) {
                // 成功回调, mediaArr是源数组
                // console.log(mediaArr);
                     console.log("ios2")
                videoarr = mediaArr.video;
                audioarr = mediaArr.audio;
                // console.log(videoarr);
                if (videoarr.length !== 0) {
                    camera = videoarr[valuenum];
                } else {
                    console.log("no find camera")
                    return;
                }
                // console.log(camera);
                // 旧的浏览器可能无法实现mediadevices
                if (navigator.mediaDevices === undefined) {
                    navigator.mediaDevices = {};
                }
                // 一些浏览器部分实现mediadevices。添加getUserMedia。.
                if (navigator.mediaDevices.getUserMedia === undefined) {
                    navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
                }

                setTimeout(function() {
                    var config = {

                    };

                    var w = window.screen.width;
                    var h = window.screen.height;
                    var pro; //摄像头宽高比
                    if ($ele.attr("data-proportion")) {
                        pro = parseFloat($ele.attr("data-proportion"));
                    } else {
                        pro = 0.75;
                    }
                    if ($ele.attr("data-width")) {
                        config.width = $ele.attr("data-width");
                        // console.log(config.width + "获取camera宽")
                    } else {
                        config.width = w;
                        // console.log(config.width + "默认w")
                    }
                    if ($ele.attr("data-height")) {
                        config.height = $ele.attr("data-height");
                    } else {
                        if (pageconfig.browser.versions.mobile) {
                            config.height = h * pro;
                        } else {
                            config.height = h;
                        }
                    }
                    if ($ele.attr("data-dest_width")) {
                        config.dest_width = $ele.attr("data-dest_width");
                    }
                    if ($ele.attr("data-dest_height")) {
                        config.dest_height = $ele.attr("data-dest_height");
                    }
                    if ($ele.attr("data-image_format")) {
                        config.image_format = $ele.attr("data-image_format");
                    } else {
                        config.image_format = "jpeg";
                    }
                    if ($ele.attr("data-jpeg_quality")) {
                        config.jpeg_quality = $ele.attr("data-jpeg_quality");
                    } else {
                        config.jpeg_quality = 90;
                    }
                    config.constraints = {
                        optional: [{
                            sourceId: camera
                        }]
                    }
                    Webcam.set(config);
                    Webcam.attach('.camera');
                }, 500);
            }, function(err) {
                // 失败回调, err是错误信息
                console.log(err);
                console.log("没有可用媒体设备");
            })
     
    }


    function processElement($ele) {
        // 对 $ele 元素做对应处理
        // valuenum = 0; //默认手机摄像头
        if ($ele.attr("data--enable") == "false") {
            Webcam.reset();
            $ele.children(".camera").css({ "width": "0", "height": "0" });
            return;
            // webcamjs($ele, 2);
        } else {
            var valuenum = 1;
            Webcam.reset();
            webcamjs($ele, 1);
            // console.log('processElement')
            $(".photograph", $ele).on("click", function(e) {
                if ($ele.attr("data--enable") != "false") {
                    //console.log(123)
                    var imgID=$ele.attr("data-imgID");
                  if(imgID){
                      Webcam.snap(function(data_uri) {
                        if($ele.attr("data-images") == "true"){
                            $("body").find(imgID).empty();
                        }
                        $("body").find(imgID).append('<img src="' + data_uri + '"/>');
                        $.wwclass.helper.updateProp($ele, "data-x-imgsrc", data_uri);
                        //console.log(data_uri);

                        var arr = data_uri.split(','),
                            mime = arr[0].match(/:(.*?);/)[1],
                            bstr = atob(arr[1]),
                            n = bstr.length,
                            u8arr = new Uint8Array(n);
                        while (n--) {
                            u8arr[n] = bstr.charCodeAt(n);
                        }
                        var datablob = new Blob([u8arr], { type: mime });

                        $ele.data("value", datablob);
                        //console.log(datablob);

                    });
                  }
                }
            });

            $(".changecamera", $ele).on("click", function(e) {
                if ($ele.attr("data--enable") == "true") {
                    if (valuenum == "1") {
                        valuenum = 0;
                        Webcam.reset();
                        webcamjs($ele, 0);
                    } else if (valuenum == "0") {
                        valuenum = 1;
                        Webcam.reset();
                        webcamjs($ele, 1);
                    }
                }
            })
            $ele.parent().css({ "margin": "0", "padding": "0" });
        }
    };

    /*
     * @description 析构每个元素, 也就是该元素该删除时的处理代码
     * @param {jQuery object} $ele - 需要处理的元素
     */
    function finalizeElement($ele) {
        // 对 $ele 元素做对应处理
    };

    // BEGIN: 监听属性处理
    /*
     * @description 监听函数, 元素的控制属性(data--)改变时处理
     * @param {jQuery object} $ele - 控制属性改变的元素
     * @param {string} attribute - 控制属性的名称
     * @param {string} value - 控制属性改变为何值
     */
    var evtInHandler = function($ele, attribute, value) {
        switch (attribute) {
            case "data--enable":
                // console.log("value:" + value)
                if (value == "false") {
                    // console.log("false")
                    Webcam.reset();
                    $ele.children(".camera").css({ "width": "0", "height": "0" });
                    return;

                } else {
                    // console.log("true")
                    var valuenum = 1;
                    Webcam.reset();
                    webcamjs($ele, 1);

                }
            case "data--webcamera":
                var value = parseInt(value)
                if (value == 1) {
                    console.log("value=1")
                    var valuenum = 1;
                    Webcam.reset();
                    webcamjs($ele, 1);

                } else {
                    var valuenum = 0;
                    console.log("value=0")
                    Webcam.reset();
                    webcamjs($ele, 0);

                }

                break;
            case "finalize":
                finalizeElement($ele);
                break;
            default:
                console.info("监听到 " + attribute + " 属性值改变为 " + value + ", 但是没找到对应处理动作.");
        }
    };
    // END: 监听属性处理

    // 以下部分不需要修改
    if (!$.wwclass) {
        console.error("Can not use without wwclass.js");
        return false;
    }

    var ret = /*INSBEGIN:WWCLSHANDLER*/
        function(set) {
            if (set.length > 0) {
                loadDependence(function() {
                    init();
                    $(set).each(function(index, targetDom) {
                        processElement($(targetDom));
                    });
                });
            }
        }
    /*INSEND:WWCLSHANDLER*/
    ;

    return ret;

}));