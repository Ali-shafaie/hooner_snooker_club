import axios from "axios";
import React, { useState, useEffect } from "react";

interface CounterUpProps {
  tableId: any;
  startTime: any;
}

function CountUpTimer(props: CounterUpProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const startDateTime = new Date(props.startTime).getTime(); // Convert the ISO string to a timestamp
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - startDateTime) / 1000);
      setElapsedTime(elapsedSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [props.startTime]);

  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  const inputDate = new Date(props.startTime);
  const formattedDate = inputDate.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Create a Date object for the given match start time
  const StartTime: any = new Date(props.startTime);

  // Get the current time
  const currentTime: any = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = StartTime - currentTime;

  // Calculate hours, minutes, and seconds
  const remhours = Math.floor(timeDifference / (1000 * 60 * 60));
  const remminutes = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );
  const remseconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Display the result dynamically
  let result = "";

  if (remhours > 0) {
    result += `${remhours} ساعت`;
  }

  if (remminutes > 0) {
    result += `${remminutes} دقیقه `;
  }

  if (remseconds > 0) {
    result += `${remseconds} ثانیه `;
  }

  return (
    <div className="">
      <div className="flex items-center justify-between  w-[250px]">
        <div className="text-md whitespace-nowrap space-y-2 px-1 text-center">
          <p>شروع</p>
          <p>{formattedDate}</p>
        </div>
        {/* <div className="text-md whitespace-nowrap space-y-1 bg-orange-400 px-2 text-center py-۱">
          <p>ختم</p>
          <p>-- -- : --</p>
        </div> */}
      </div>
      {StartTime < currentTime ? (
        <div className="text-md whitespace-nowrap space-y-2 px-1 text-cente mt-6">
          <h1>مدت بازی</h1>
          {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}
        </div>
      ) : (
        <div className="mt-4">
          <h1>مدت زمان تا شروع بازی : </h1>
          {result}
        </div>
      )}
    </div>
  );
}

export default CountUpTimer;
