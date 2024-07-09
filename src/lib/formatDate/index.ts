import { useState, useEffect } from "react";
import moment from "moment";

const calculateTimeAgo = (createdAt: moment.MomentInput) => {
  const currentTime = moment();
  const diffDuration = moment.duration(currentTime.diff(moment(createdAt)));

  let result = "";
  if (diffDuration.asSeconds() < 60) {
    result = Math.floor(diffDuration.asSeconds()) + " second";
  } else if (diffDuration.asMinutes() < 60) {
    result = Math.floor(diffDuration.asMinutes()) + " minutes";
  } else if (diffDuration.asHours() < 24) {
    result = Math.floor(diffDuration.asHours()) + " hours";
  } else if (diffDuration.asDays() < 30) {
    result = Math.floor(diffDuration.asDays()) + " days ";
  } else if (diffDuration.asMonths() < 12) {
    result = Math.floor(diffDuration.asMonths()) + " months";
  } else {
    result = Math.floor(diffDuration.asYears()) + " years";
  }

  return result;
};

const FormatDate = ({ createdAt }: { createdAt: any }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeAgo = calculateTimeAgo(createdAt);
      setTimeAgo(timeAgo);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [createdAt]);

 return timeAgo
};

export default FormatDate;
