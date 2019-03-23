import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import {Modal,Button} from 'react-bootstrap';


class ViewFilterSaveModal extends Component {
  
  constructor() {
    super();
    this.state = {
      name:''
    }
  }

  handleTextChange = name => event =>{this.setState({[name]: event.target.value,});}

  render() {
    return (
      <div>  
        <Modal show={this.props.open} onHide={this.props.oncloseModal}>
            <Modal.Header>
              <Modal.Title>View Filter Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TextField
                    id="outlined-name"
                    label="Title"
                    value={this.state.name}
                    onChange={this.handleTextChange('name')}
                    margin="normal"
                    variant="outlined"
              />
            </Modal.Body>
            <Modal.Footer> 
              <Button onClick={this.props.oncloseModal}>Close</Button>
              <Button onClick={()=>{this.props.onSaveViewFilter(this.state.name)}} bsStyle="primary">Save changes</Button>
            </Modal.Footer>
        </Modal>   
      </div>
    );
  }
}

export default ViewFilterSaveModal;
