import React, { Component } from 'react';
import pin from "../../assets/pin.png"
import './NoteCard.css';

class NoteCard extends Component {
  render() {
    return (
      <div className='note-card p-3'>
        <div className='container-fluid'>
          <div className='row'>
          <div className='col-10'>
          <div className='row mt-2'>
            <div className='tags-container'> 
              <div className='tag' style={{backgroundColor: 'var(--sageGreen)'}}> school </div>
              <div className='tag' style={{backgroundColor: 'var(--marigold)'}}> essay  </div>
              <div className='tag' style={{backgroundColor: 'var(--celeste)'}}> history </div>
            </div>
            </div>
          <div className='row mt-3 p-1'>
          <h5 className='note-title'> Note Title </h5>
            <div className='note-text m-2'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Cras sodales nunc nec laoreet molestie. Praesent ac erat in felis fringilla volutpat sed quis ligula.
                Phasellus non nunc elementum, posuere nibh id, ullamcorper mi. Nam pulvinar nisl erat. Suspendisse tempus nisl in viverra facilisis.
                Nunc sit amet posuere justo, quis facilisis eros.
                Nullam nec purus viverra, rutrum risus non, facilisis est. Nullam lacinia neque arcu, eget ornare nunc efficitur a.
                Nullam a metus id nisl tristique vulputate. Nam interdum iaculis velit non venenatis. 
                Integer lectus enim, rhoncus congue aliquam quis, laoreet quis ligula. Sed nec ipsum ut augue tempus molestie vel ut orci. 
                Aliquam dignissim mi ex, scelerisque scelerisque tellus fermentum ac. Mauris at massa enim. Etiam rutrum ultrices convallis. 
                Aliquam vitae viverra ligula. Pellentesque gravida elementum fermentum. 
                In auctor fringilla tincidunt. Maecenas egestas ligula augue, sed interdum sem condimentum sed. Nam fermentum aliquet leo, in dictum mi malesuada ac. 
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <p className='footer mt-2'>  20:33 - 19 march 2025 </p>
            </div>
          </div>
          </div>
          <div className='col-2 d-flex justify-content-end align-items-start'>  
              <img className='pin' src={pin}/>

            </div>
            </div>
        </div>
      </div>
    );
  }

}

export default NoteCard;

