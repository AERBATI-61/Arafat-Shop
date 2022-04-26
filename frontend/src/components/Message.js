import React from "react";

import {Alert} from "react-bootstrap";

function Loader({variant, children}) {
    return (

        <Alert variant={variant}>
               {children}
        </Alert>
    )
}

export default Loader













