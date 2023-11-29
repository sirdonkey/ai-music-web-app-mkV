song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
song1status = "";
song2status = "";
function setup()
{
    
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    PoseNet = ml5.PoseNet(video ,modelLoaded);
    PoseNet.on('pose',gotPoses);
}

function modelLoaded()
{
console.log('PoseNet is initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
        
        leftWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    }
}

function preload()
{
    song1 = loadSound("Punch.mp3");
    song2 = loadSound("Rise of the Triad.ogg");
}

function draw()
{
    image(video, 0, 0, 600, 500);
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX , leftWristY , 20);
        song1.stop();
        if(song2status == false)
        {
            song.play();
            document.getElementById("song").innerHTML="playing-song2";
        }
    }


    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX , rightWristY , 20);
        song2.stop();
        if(song1status == false)
        {
            song.play();
            document.getElementById("song").innerHTML="playing-song1";
        }
    }
}

function play()
{
    song.play();
}