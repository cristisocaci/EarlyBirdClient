import axios from "axios";

async function GetReviewsForUser(id) {
  let path = sessionStorage.getItem("server") + "/api/reviews";
  try {
    let response = await axios.get(path, {
      headers: {"Authorization":"Bearer "+localStorage.getItem("jwt")},
      params:{receiverId: id}
    });
    return response.data;
  } catch  {
    console.log("Error");
  }
}

export {GetReviewsForUser};