import React from "react";

interface WarningProps {
    handleClose: any
}

const ConfirmationPopUp: React.FC<WarningProps> = ({ handleClose }) => {
    return ( 
        <div className="container fixed flex flex-col justify-center items-center max-w-lg top-2/4 my-0 mx-auto bg-neutral-200 opacity-90 mh-60 rounded-lg">
            <h1 className="p-4 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">the purchase limit is $100. your purchase would exceed this limit</h1>
            <div>
                <img width={60} height={60} src="warning.png"></img>
            </div>
            <button className="border border-black p-2 my-4" onClick={handleClose}>CLOSE</button>
        </div>
    )
}

export default ConfirmationPopUp;