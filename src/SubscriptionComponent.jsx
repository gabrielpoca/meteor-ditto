import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setReady } from './actions';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setReady }, dispatch);
};

export default ComposedComponent => {
  class SubscriptionComponent extends Component {
    constructor() {
      super();
      this.subs = {};
      this.ready = {};
    }

    componentWillUnmount() {
      Object.keys(this.subs).map(key => this.subs[key].stop());
      Object.keys(this.ready).map(key => this.ready[key].stop());
    }

    subscribe(name, ...args) {
      if (this.subs[name])
        this.subs[name].stop();

      this.subs[name] = Meteor.subscribe(name, ...args);

      Tracker.autorun((comp) => {
        this.ready[name] = comp;
        this.props.setReady(name, this.subs[name].ready());
      });
    }

    subscriptionReady(name) {
      return this.props.mongo.collectionsReady[name];
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          subscribe={this.subscribe.bind(this)}
          subscriptionReady={this.subscriptionReady.bind(this)}
        />
      );
    }
  }

  SubscriptionComponent.propTypes = {
    mongo: PropTypes.object.isRequired,
    setReady: PropTypes.func.isRequired,
  };

  return connect(fn => fn, mapDispatchToProps)(SubscriptionComponent);
};
