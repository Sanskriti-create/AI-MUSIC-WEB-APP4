song1 = "";
song2 = "";
leftWristY = 0;
leftWristX = 0;
rightWristY = 0;
rightWristX = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
status = "";

function preload()
{
    song1 = loadSound("CT.mp3");
    song2 = loadSound("HP.mp3");
}

function setup()
{
    canvas = createCanvas(450,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
      console.log(results);

      scoreLeftWrist = results[0].pose.keypoints[9].score;
      scoreRightWrist = results[0].pose.keypoints[10].score;
      console.log('scoreRightWrist : ' + scoreRightWrist + ' scoreLeftWrist : ' + scoreLeftWrist);

      leftWristX = results[0].pose.leftWrist.x;
      leftWristY = results[0].pose.leftWrist.y;
      console.log('leftWristX : ' + leftWristX + ' & leftWristY : ' + leftWristY);

      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;
      console.log('rightWristX : ' + rightWristX + ' & rightWristY : ' + rightWristY);
  }
}

function draw()
{
    image(video, 0, 0, 600, 500);

    status = song1.isPlaying();
    

    fill("#0f6069");
    stroke("#0f6069");

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        song1.play();
        song1.rate(1);
        song1.volume(1);
        document.getElementById("name").innerHTML = "Song's Name Is Cheap Thrills"; 

        if(status == "false")
        { 
            song1.play();
            document.getElementById("name").innerHTML = "Song's Name Is Cheap Thrills"; 
        }
    }

    status = song2.isPlaying();

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        song2.play();
        song2.rate(1);
        song2.volume(1);
        document.getElementById("name").innerHTML = "Song's Name Is Harry Potter's Theme Music"; 

        if(status == "false")
        { 
            song2.play();
            document.getElementById("name").innerHTML = "Song's Name Is Harry Potter's Theme Music"; 
        }
    }

}
