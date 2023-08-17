import OptionsBar from "./OptionsBar/OptionsBar";
import ChatsBox from "./ChatsBox/ChatsBox";
import "./Sidebar.css";

function Sidebar() {

    return (
        <div className="sidebar-container">
            <div className="left-panel-head">
                <OptionsBar />
            </div>
            <div className="left-panel-box">
                <ChatsBox />
            </div>
        </div>
    )
}

export default Sidebar;