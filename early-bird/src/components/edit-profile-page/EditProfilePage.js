import "./EditProfilePage.scss";
import editLogo from "../../illustrations/Saly-edit-profile-page.svg";

function EditProfilePage(){

    return(
        <div id="edit-logo-div" className="d-none d-md-flex col-0 col-md-4">
          <img className="edit-page-logo" src={editLogo} alt=""></img>
        </div>
    );

}

export default EditProfilePage;


