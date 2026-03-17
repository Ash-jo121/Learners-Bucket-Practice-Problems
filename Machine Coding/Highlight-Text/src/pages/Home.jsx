import React from "react";
import { useRef } from "react";
import { useSelection } from "../../hooks/useSelection";
import PopUp from "../components/PopUp";

export default function () {
  const ref = useRef(null);

  const selection = useSelection(ref);

  return (
    <>
      {selection.text && (
        <PopUp x={selection.coords.x} y={selection.coords.y} />
      )}
      <div ref={ref} id="sample-paragraph">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut nibh
        urna. Aliquam sit amet facilisis dui. Donec ut scelerisque est, ac
        condimentum eros. Praesent viverra dapibus leo quis commodo. Quisque
        nisl justo, pharetra vitae urna id, tristique lacinia augue. Phasellus
        blandit volutpat dui vitae euismod. Nam consectetur, ipsum in pharetra
        fringilla, ante nisl vestibulum risus, id interdum risus ante vel sem.
        Duis fermentum vulputate bibendum. Mauris tempor, augue id iaculis
        tempor, ipsum lectus molestie sem, a ultrices diam dui id magna. Nullam
        in suscipit ligula. Etiam sapien quam, dignissim et tortor nec, iaculis
        eleifend leo. In pretium leo ac purus luctus, vel condimentum diam
        bibendum. Maecenas pharetra risus nibh. Mauris sit amet nibh in dolor
        tempus rutrum. Ut vel tortor nunc. Nulla elementum dolor vel nisl
        molestie posuere a quis felis. Nunc blandit justo et nulla luctus
        interdum. Donec sed neque felis. Ut placerat id tellus non euismod. In
        pellentesque in lorem vel pharetra. Curabitur molestie est ante, eu
        gravida ipsum malesuada eu. Duis sodales rhoncus tellus, non faucibus
        nunc convallis eget. Donec ac interdum leo. Donec sapien odio, viverra
        vitae auctor vel, tincidunt vel libero.
      </div>
    </>
  );
}
