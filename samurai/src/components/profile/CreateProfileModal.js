import React, { useState, useEffect} from 'react';

const CreateProfileModal = (props) => {

    const {getProfile} = props;
    const [newProfile, setNewProfile] = useState({
        name: "",
        about: "",
        most_impressive_thing: "",
        interests: ""
    });
    const [highlights, setHighlights] = useState([])

    const editHighlight = (e, idx) => {
        let new_highlights = [...highlights];
        new_highlights[idx][e.target.id] = e.target.value;
        setHighlights(new_highlights);
    }

    const addHighlight = () => {
        setHighlights([...highlights, {description: "", img: "", name: "", link: ""}])
    }

    const deleteHighlight = (idx) => {
        const new_highlights = highlights.splice(idx,1);
        setHighlights(new_highlights);
    }

    return (
        <div className="modal fade" id="createProfileModal" tabindex="-1" aria-labelledby="createProfileModal" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="" id="modal-title">Create Profile</h3>
                    </div>
                    <div className="modal-body">
                        <form className="row g-3">
                            {/* Profile Name */}
                            <div className="col-12">
                                <label for="about" className="form-label">How do you want to name this profile?</label>
                                <input type="text" onChange={e => setNewProfile({...newProfile, name: e.target.value})} className="form-control" id="name"/>
                            </div>
                            {/* About */}
                            <div className="col-12">
                                <label for="about" className="form-label">About You</label>
                                <textarea maxLength="500" onChange={e => setNewProfile({...newProfile, about: e.target.value})} className="form-control" id="about" rows="4"></textarea>
                            </div>
                            {/* Most Impressive Thing */}
                            <div className="col-12">
                                <label for="most_impressive_thing" className="form-label">Most Impressive Thing</label>
                                <textarea maxLength="500" onChange={e => setNewProfile({...newProfile, most_impressive_thing: e.target.value})} className="form-control" id="most_impressive_thing" rows="4"></textarea>
                            </div>
                            {/* Interests */}
                            <div className="col-12">
                                <label for="interests" className="form-label">Interests</label>
                                <textarea maxLength="200" onChange={e => setNewProfile({...newProfile, interests: e.target.value})} className="form-control" id="interests" rows="2"></textarea>
                            </div>
                            {/* Highlights */}
                            <div className="col-12">
                                <label for="highlights" className="form-label">Highlights (ej. Projects, Experiences, etc)</label>
                                <i type="button" onClick={() => addHighlight()} className=" ms-3 bi bi-plus-lg"></i>
                                
                                {highlights.map((highlight, idx) => {
                                    return (
                                        <div className="mb-2 mt-2" key={idx}>
                                            {/* Name */}
                                            <div className="mt-3">
                                                <label for="name" className="form-label">Name</label>
                                                <input type="text" value={highlight.name} onChange={e => editHighlight(e, idx)} className="form-control" id="name"/>
                                            </div>
                                            {/* Descripción */}
                                            <div className="mt-3">
                                                <label for="description" className="form-label">Description</label>
                                                <textarea maxLength="200" onChange={e => editHighlight(e, idx)} className="form-control" id="description" rows="2"></textarea>
                                            </div>
                                            {/* Link */}
                                            <div className="mt-3">
                                                <label for="link" className="form-label">Link</label>
                                                <input type="text" placeholder="optional" onChange={e => editHighlight(e, idx)} className="form-control" id="link"/>
                                            </div>
                                            {/* Imagen */}
                                        </div> 
                                    )
                                })}
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer mb-2">
                        <button type="button" className="btn btn-cancel mt-2" aria-label="Close" data-bs-dismiss="modal">Cancel</button>
                        <h5 className="btn btn-join mt-2" onClick={() => getProfile(newProfile, highlights)} data-bs-dismiss="modal">Create</h5>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default CreateProfileModal;