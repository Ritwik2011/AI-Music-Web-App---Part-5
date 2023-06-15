song = "Magic Music";
scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload() {
  song = loadSound("song1.mp3");
}

function setup() {
  canvas = createCanvas(600, 500);

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
  }
}

function draw() {
  image(video, 0, 0, 600, 500);

  fill("#FF0000");
  stroke("#FF0000");

  if (scoreRightWrist > 0.2) {
    circle(rightWristX, rightWristY, 20);

    if (rightWristY > 0 && rightWristY <= 100) {
      document.getElementById("speed").innerHTML = "Speed = 0.5x";
      // Modify the magic effect based on the right wrist position
      performMagic(0.5);
    } else if (rightWristY > 100 && rightWristY <= 200) {
      document.getElementById("speed").innerHTML = "Speed = 1x";
      performMagic(1);
    } else if (rightWristY > 200 && rightWristY <= 300) {
      document.getElementById("speed").innerHTML = "Speed = 1.5x";
      performMagic(1.5);
    } else if (rightWristY > 300 && rightWristY <= 400) {
      document.getElementById("speed").innerHTML = "Speed = 2x";
      performMagic(2);
    } else if (rightWristY > 400 && rightWristY <= 500) {
      document.getElementById("speed").innerHTML = "Speed = 2.5x";
      performMagic(2.5);
    }

    if (scoreLeftWrist > 0.2) {
      circle(leftWristX, leftWristY, 20);
      volume = map(leftWristY, 0, 500, 0, 1);
      document.getElementById("volume").innerHTML = "Volume = " + volume;
      setSongVolume(volume);
    }
  }
}

function performMagic(speed) {
  song.play();
  song.rate(speed);
}

function setSongVolume(volume) {
  song.setVolume(volume);
}

function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}
