const main = async () => {
  const FfmpegOp = require('./FfmpegOperation');
  const FfmpegOpObj = new FfmpegOp();
  const videoPath = './input/h265-test-640.mp4';
  const outputPath = './output/';
  //获取视频时长
  const duration = await FfmpegOpObj.getVideoTotalDuration(videoPath);
  console.log('duration', duration);
  //获取缩略图
  // await FfmpegOpObj.getVideoSceenshots(videoPath, outputPath, 1, 1)
  //拆分视频——视频格式转换
  // await FfmpegOpObj.splitVideo(videoPath, 0, duration, outputPath + 'splitVideo.mp4')
  //视频格式转换
  await FfmpegOpObj.convertVideo(videoPath, 'h264', outputPath + 'convertVideo.mp4');
}
main().then().catch(console.error)