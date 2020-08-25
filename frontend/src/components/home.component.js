import React, { Component } from "react";
import { ReactComponent as TrashIcon } from "../assets/icons/trash.svg";
import { ReactComponent as PencilIcon } from "../assets/icons/pencil.svg";

import ChannelService from "../services/channel.service";

export default class Home extends Component {
   constructor(props) {
      super(props);

      this.deleteChannel = this.deleteChannel.bind(this);
      this.editChannel = this.editChannel.bind(this);

      this.state = {
         content: [],
      };
   }

   componentDidMount() {
      ChannelService.getChannelList()
         .then((data) => {
            this.setState({ content: data });
         })
         .catch((error) => {
            console.log(error);
            this.setState({ content: [] });
         })
   }

   channelList() {
      return this.state.content.map(c => {
         return <Channel channel={c}
            deleteChannel={this.deleteChannel}
            editChannel={this.editChannel}
            key={c._id}
         />
      })
   }

   deleteChannel(id) {
      console.log(`Trying to delete channel with db id: ${id}`)
   }

   editChannel(id) {
      console.log(`Trying to edit channel with db id: ${id}`)
   }

   render() {
      return (
         <div className="container">
            <h3>Your Channels</h3>
            <table className="table">
               <thead className="thead-light">
                  <tr>
                     <th>Number</th>
                     <th>Name</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {this.channelList()}
               </tbody>
            </table>
         </div>
      );
   }
}

const Channel = props => (
   <tr>
      <td>{props.channel.channel_num}</td>
      <td>{props.channel.channel_name}</td>
      <td>
         <button onClick={() => props.deleteChannel(props.channel._id)}
            className="btn btn-danger">
            <TrashIcon />
         </button>
         <button onClick={() => props.editChannel(props.channel._id)}
            className="btn btn-warning ml-1">
            <PencilIcon />
         </button>
      </td>
   </tr>
)
