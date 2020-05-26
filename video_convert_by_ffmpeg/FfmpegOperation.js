//ffmpeg 操作类  https://www.npmjs.com/package/ffmpeg

const ffmpeg = require('ffmpeg')

module.exports = class FfmpegOp {
  constructor() {
  }
  //获取视频时长
  getVideoTotalDuration(videoPath) {
    const process = new ffmpeg(videoPath)
    return process.then((video) => {
      console.log('seconds:' + video.metadata.duration.seconds)
      return video.metadata.duration.seconds || 0
    }, (err) => {
      console.log('err:' + err.message)
      return -1
    })
  }
  //获取视频缩略图
  getVideoSceenshots(videoPath, outPutPath, frameRate, frameCount) {
    const process = new ffmpeg(videoPath);
    return process.then((video) => {
      video.fnExtractFrameToJPG(outPutPath, {
        frame_rate: frameRate,
        number: frameCount,
        file_name: 'video_frame_%t_%s'
      }, (error, files) => {
        if (!error)
          console.log('Frames: ' + files)
      })
    }, function (err) {
      console.log('Error: ' + err)
    })
  }

  //拆分视频
  splitVideo(videoPath, startTime, duration, outVideoPath) {
    const process = new ffmpeg(videoPath)
    return process.then((video) => {
      video
        .setVideoStartTime(startTime)
        .setVideoDuration(duration)
        .save(outVideoPath, function (error, file) {
          if (!error) {
            console.log('Video file: ' + file)
          }
        })
    }, (err) => {
      console.log('Error: ' + err)
    })
  }

  //视频格式转换
  convertVideo(videoPath, type, outVideoPath) {
    const process = new ffmpeg(videoPath)
    return process.then((video) => {
      video
        .setVideoCodec(type)
        .save(outVideoPath, function (error, file) {
          if (!error) {
            console.log('convertVideo file: ' + file)
          }
        })
    }, (err) => {
      console.log('convertVideo Error: ' + err)
    })
  }
}