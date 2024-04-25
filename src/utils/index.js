const getTimeBasedOnCreationTime = (creationTime) => {
  let difference = new Date().getTime() - new Date(creationTime).getTime();

  difference = difference / 1000;

  let hourDifference = Math.floor(difference / 3600);
  difference = difference - hourDifference * 3600;
  let minuteDifference = Math.floor(difference / 60);
  const secondDifference = difference - minuteDifference * 60;

  let message;

  if (hourDifference > 23) {
    const date = new Date(creationTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    message = `${day}/${month}/${year}`;
  } else {
    if (hourDifference > 0) {
      message = `${hourDifference} hr`;
    }

    if (minuteDifference > 0) {
      message = message
        ? `${message} ${minuteDifference} min`
        : `${minuteDifference} min`;
    }

    if (secondDifference) {
      message = message
        ? `${message} ${Math.round(secondDifference)} sec`
        : `${secondDifference} sec`;
    }
  }

  return message;
};

export { getTimeBasedOnCreationTime };
