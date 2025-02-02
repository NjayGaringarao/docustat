import { Alert } from "react-native";

export const confirmAction = (title: string, message: string) => {
  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Yes",
          onPress: () => resolve(true),
        },
        {
          text: "No",
          onPress: () => resolve(false),
        },
      ],
      { cancelable: false }
    );
  });
};

export const formatDateToLocal = (isoDate: string) => {
  // Get local timezone
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Create a Date object from the ISO string
  const date = new Date(isoDate);

  // Define the options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };

  // Use toLocaleString to apply local timezone formatting
  const formattedDate = date.toLocaleString("en-US", {
    ...options,
    timeZone: localTimeZone,
  });

  return formattedDate;
};

export const getTimeAgo = (isoDate: string, isIntervalShort?: boolean) => {
  const now = new Date();
  const then = new Date(isoDate);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  let timeIntervals: { unit: string; seconds: number }[] = [];

  if (isIntervalShort) {
    timeIntervals = [
      { unit: "d", seconds: 60 * 60 * 24 },
      { unit: "h", seconds: 60 * 60 },
      { unit: "m", seconds: 60 },
      { unit: "s", seconds: 1 },
    ];
  } else {
    timeIntervals = [
      { unit: "year", seconds: 60 * 60 * 24 * 365 },
      { unit: "month", seconds: 60 * 60 * 24 * 30 },
      { unit: "day", seconds: 60 * 60 * 24 },
      { unit: "hour", seconds: 60 * 60 },
      { unit: "minute", seconds: 60 },
      { unit: "second", seconds: 1 },
    ];
  }

  for (let i = 0; i < timeIntervals.length; i++) {
    const interval = timeIntervals[i];
    const result = Math.floor(diffInSeconds / interval.seconds);

    if (result >= 1) {
      return `${result}${isIntervalShort ? "" : " "}${interval.unit}${
        result > 1 && !isIntervalShort ? "s" : ""
      } ago`;
    }
  }

  return "Just now";
};

type HasCreatedAt = {
  created_at: Date;
};
export const sortByDate = <T extends HasCreatedAt>(
  items: T[],
  sortDateAsc: boolean = false
): T[] => {
  try {
    items.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;

      return sortDateAsc ? dateA - dateB : dateB - dateA;
    });

    return items;
  } catch (error) {
    console.log(`ERROR (sortByCreatedAt) :: ${error}`);
    throw error;
  }
};
