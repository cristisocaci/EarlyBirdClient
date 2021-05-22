import axios from "axios";

export async function GetReviewsForUser(id) {
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

export async function AddReview(data) {
  let path = sessionStorage.getItem("server") + "/api/reviews";
  try {
    let response = await axios.post(path, data, {
      headers: {"Authorization":"Bearer "+localStorage.getItem("jwt")},
    });
    return response.data;
  } catch  {
    console.log("Error");
  }
}
