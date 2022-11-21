export default function CreateStopPage () {
    return ( 
        <div className="CreateStopPage">
            <h2>Create A Stop</h2>
            <form className="CreateStopForm">
                <label>Stop Name:</label>
                <input 
                    type='text' 
                    required 
                    name='stop-name'
                />
                <label>Latitude:</label>
                <input 
                    type='text' 
                    required 
                    name='stop-lat' 
                />
                <label>Longitude:</label>
                <input 
                    type='text' 
                    required 
                    name='stop-lng' 
                />
                <label>Select a Stop Category:</label>
                <select name='stop-ctegory' id='stop-category-select'>
                    <option value='caverns'>Caverns</option>
                    <option value='climbing-access'>Climbing Access/Scrambling</option>
                    <option value='hiking-trail'>Hiking Trail</option>
                    <option value='national-monument'>National Monument</option>
                    <option value='national-park'>National Park</option>
                    <option value='picnic-area'>Picnic Area</option>
                    <option value='state-park'>State Park</option>
                    <option value='swimming-hole'>Swimming Hole</option>
                    <option value='unique-find'>Unique Find</option>
                    <option value='view-point'>View Point</option>
                    <option value='water-access'>Water Access</option>
                </select>
                <button>Create Stop</button>
            </form>
        
        </div>
     );
}
 
