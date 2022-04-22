# webcam
利用手机或pc的摄像头拍照<br>
<img src="http://www.wware.org/img/webcam.png?_3d9b" width="400px"><br>
普通属性<br>
data-width	摄像机窗口的宽度(单位:像素px),不填写时,可以通过'data-width'数据绑定变量,或默认整屏宽度(App端建议默认)	data-width:320<br>
data-height	摄像机窗口的高度(单位:像素px),不填写时,可以通过'data-height'数据绑定变量,默认:根据摄像头宽高比,已整宽计算高度(App端建议默认).	data-height:240<br>
data-imgID	拍照后,显示照片的区域,此处填写jquery选择器,例如:#abc ,建议使用空标签存放,拍摄单张图片时,会清空内容,可通过data-imgID控制.	#abc<br>
data-images	设置连拍数量,即:连续拍照,显示单张或多张照片.	默认:多张<br>
data-dest_width	捕获的摄像机图像的宽度(单位:像素px),不填写时,可以通过'data-dest_width'数据绑定变量,默认:摄像头显示框大小(App端建议默认).	data-dest_width:320<br>
data-dest_height	捕获的摄像机图像的高度(单位:像素px),不填写时,可以通过'data-dest_height'数据绑定变量,默认:摄像头显示框大小(App端建议默认).	data-dest_height:240<br>
data-proportion	设置选择摄像头宽高比,一般默认即可	下拉选择即可,一般设为默认的4:3即可<br>
data-image_format	所需图像的图像格式，可能是“jpeg”或“png”,默认:jpeg	jpeg<br>
data-jpeg_quality	对于JPEG图像，这是所需的质量，从0（最差）到100（最佳）,不填写时,可以通过'data-jpeg_quality'数据绑定变量,默认:90	data-jpeg_quality:100<br>
控制属性<br>
data--enable	启用/禁用摄像头拍照功能	启用/禁止<br>
data--webcamera	如果手机,控制前后摄像头	data--webcamera:1(1:后摄像头;0:前置摄像头)<br>
输出属性<br>
data-x-imgsrc	通过'data-x-imgsrc'属性可以获取拍照后,64位转码的图片路径	示例<br>
