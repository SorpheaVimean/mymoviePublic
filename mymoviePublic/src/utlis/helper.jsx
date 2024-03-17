import moment from "moment"

export const isEmptyOrNull = (value) => {
    return value === "" || value === null || value === 0 || value === undefined ? true : false;
  };
// config image
export const configImage = {
    image_path: "https://image.tmdb.org/t/p/original/",
  };

export const formatDateClient = (date) => {
    if(!isEmptyOrNull(date)){
        return moment(date).format("YYYY");
    }
    return null
  }
  export const formatDate = (date) => {
    if (!isEmptyOrNull(date)) {
        return moment(date).format("DD MMMM YYYY");
    }
    return null;
};
  
  export const minToHour = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}mn`;
  }