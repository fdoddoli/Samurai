import React, { useState, useEffect} from 'react';

const JoinGroupModal = (props) => {

    const {getGroup} = props;
    const [group_code, setGroupCode] = useState("");

    return (
        <div className="modal fade" id="joinGroupModal" tabindex="-1" aria-labelledby="joinGroupModal" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content joinGroupModal">
                    <div className="modal-header">
                        <h3 className="modal-title-join-group" id="modal-title">Join Group</h3>
                    </div>
                    <div className="modal-body">
                        <div className="col-12 mt-2 mb-2">
                            <label for="group_code" className="form-label group_code_header">Group Code</label>
                            <input type="text" onChange={e => setGroupCode(e.target.value)} className="form-control group_code_input" id="group_code"/>
                        </div>
                    </div>
                    <div class="modal-footer mb-2">
                        <button type="button" className="btn btn-cancel mt-2" aria-label="Close" data-bs-dismiss="modal">Cancel</button>
                        <h5 className="btn btn-join mt-2" data-bs-dismiss="modal" onClick={() => getGroup(group_code)}>Join</h5>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default JoinGroupModal;