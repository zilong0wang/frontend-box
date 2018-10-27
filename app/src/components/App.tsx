import * as React from 'react'

interface Props { }
interface State { }

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <h1>Hellp World</h1>
            </React.Fragment>
        )
    }
}

export default App