import { Alert } from "react-native";
import { MD5 } from "crypto-es/lib/md5";

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

type HasUpdatedAt = {
  updated_at: Date;
};
export const sortByUpdatedAt = <T extends HasUpdatedAt>(
  items: T[],
  sortDateAsc: boolean = false
): T[] => {
  try {
    items.sort((a, b) => {
      const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
      const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;

      return sortDateAsc ? dateA - dateB : dateB - dateA;
    });

    return items;
  } catch (error) {
    console.log(`ERROR (sortByUpdatedAt) :: ${error}`);
    throw error;
  }
};

export const convertToBase64 = async (uri: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise<string | undefined>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject("Error converting image to Base64");
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error converting image to Base64:", error);
    return undefined;
  }
};

export const getHTMLImageRender = (
  preview_src: string | string[],
  imageIDRenderHandle?: (id: string) => string
) => {
  if (Array.isArray(preview_src) && imageIDRenderHandle) {
    return `<!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: black;
          }
          img {
            width: 100%;
            height: auto;
          }
          p {
            font-size: 3rem;
            color: white;
            text-align: center;
            padding: 6rem 0; /* Equivalent to py-24 in Tailwind */
          }
          div {
            width: 100%;
            height: 10rem;
            background-color: black
          }
        </style>
      </head>
      <body>
        <div></div>
        ${preview_src
          .map(
            (item) => `<img src="${imageIDRenderHandle(item)}" alt="Image"/>`
          )
          .join("")}
        <p>Nothing Follows</p>
      </body>
    </html>`;
  } else {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh; /* Use full height of the viewport */
            background-color: black;
          }
          img {
            max-width: 100%; /* Ensure it doesn't exceed the width */
            max-height: 100%; /* Ensure it doesn't exceed the height */
            object-fit: contain; /* Maintain aspect ratio */
          }
        </style>
      </head>
      <body>
        <img src="${preview_src}" alt="Full Screen Image" />
      </body>
    </html>
  `;
  }
};

export const hashId = (id: string) => {
  return MD5(id).toString();
};
