import React, { Component } from 'react';
const TrustBox = ({ trustBoxRef }) => (
  <div
ref={trustBoxRef} // We need a reference to this element to load the TrustBox in componentDidMount.
className="trustpilot-widget" // Renamed this to className.
// [ long list of data attributes...]
  >
<a
  href="https://www.trustpilot.com/review/example.com"
  target="_blank"
  rel="noopener noreferrer"
>
  Trustpilot
</a>
  </div>
);
class TrustBoxContainer extends Component {
  constructor(props:any) {
super(props);
this.trustBoxRef = React.createRef();
  }
  componentDidMount() {
// If window.Trustpilot is available it means that we need to load the TrustBox from our ref.
// If it's not, it means the script you pasted into <head /> isn't loaded just yet.
// When it is, it will automatically load the TrustBox.
if (window.Trustpilot) {
  window.Trustpilot.loadFromElement(this.trustBoxRef.current, true);
}
  }
  render() {
return <TrustBox trustBoxRef={this.trustBoxRef} />;
  }
}
export default TrustBoxContainer;