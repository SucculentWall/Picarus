var React = require('react');
// var GalleryStore = require('../../stores/app-galleryStore');
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
  //   this.state.request_id = GalleryStore.getPhoto(this.props.data.photo_id).request_id;
  // },

  render: function(){
    // console.log('profile comment data ',this.props.data);
    if (!this.props.data) return (<div></div>);
    else  {
      var formattedDate = new Date(this.props.data.created_at).toLocaleString();
      return (
        <div>
          {formattedDate} <span className='comment recent'>{this.props.data.text}</span>
        </div>
      );
    }
  }
});

module.exports = ProfileComment;