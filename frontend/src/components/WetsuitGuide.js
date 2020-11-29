import React from 'react'
import { useHistory } from "react-router-dom";
import { Table, Button } from 'react-bootstrap'

const WetsuitGuide = () => {
    const history = useHistory();
    return (
        <div>
            <div className='py-2'>
            <Button className='btn btn-dark my-3 px-2'
                onClick={() => {
                    history.goBack();
                }}
            >
                Go back
            </Button>
            </div>
            <h1 className="py-2">Wetsuit Guide</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Temperature Range (F)</th>
                        <th>Wetsuit Thickness</th>
                        <th>Recommended Gear</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='ice'> 42 and below </td>
                        <td> 6/5mm </td>
                        <td> Suits, Boots, Gloves, Hood</td>
                    </tr>
                    <tr >
                        <td className='cold'> 43-55 </td>
                        <td> 5/4 mm </td>
                        <td> Suits, Boots, Gloves, Hood</td>
                    </tr>
                    <tr >
                        <td className='neutral'> 56-63 </td>
                        <td> 4/3mm </td>
                        <td> Suits, Boots </td>
                    </tr>
                    <tr >
                        <td className='neutral2'> 64-68 </td>
                        <td> 3/2 mm </td>
                        <td> Suit</td>
                    </tr>
                    <tr >
                        <td className='warm'> 69 +  </td>
                        <td> 2/1 mm </td>
                        <td> Rashgaurd </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default WetsuitGuide
