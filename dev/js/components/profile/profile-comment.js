var React = require('react');
var GalleryStore = require('../../stores/app-galleryStore');
var Link = require('react-router').Link;

var ProfileComment = React.createClass({ 
  // getInitialState: function(){
  //   return {
  //     request_id: null
  //   };
  // },

  // _getPhoto: function(){
  //     // console.log('GalleryStore request_id ',request_id);
  //     // location.hash = '/requests/'+request_id;
  // },

  // componentDidMount: function() {
  // },

  render: function(){
    if (!this.props.data) return (<div></div>);
    var photo_data = GalleryStore.getPhoto(this.props.data.photo_id);
    console.log('Photo Data', photo_data);
    var formattedDate = new Date(this.props.data.created_at).toLocaleString();
    return (
      <div>
        {formattedDate} <span className='comment recent'>{this.props.data.text}</span>
      </div>
    );
  }
});

module.exports = ProfileComment;