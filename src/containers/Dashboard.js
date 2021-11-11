import React, { useState } from "react";
import { connect } from "react-redux";
import { addItem } from '../redux/actions/dashboardAction';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const [ cardNumber, setCardNumber ] = useState("");
  const [ name, setName ] = useState("")
  const [ paid, setPaid ] = useState(false)
  const { dashboard: { cart }, addItemAction, history } = props;
  return paid ? (
      <>
        <p className="text-xl text-center" data-testid="success-msg">Paid</p>
        <div className="text-center py-3">
          <Link to="/" className="text-blue-500">
            Back to Home
          </Link>
        </div>
      </>
    ) : (
      // <React.Suspense fallback={"loading..."}>
        <div >
          <h1 className="dashboard">Dashboard</h1>
          <p data-testid={'ID-CART-LENGTH'}>item {cart.length}</p>
          <input 
            type="submit" 
            value="ADD" 
            onClick={() => addItemAction({
              id: cart.length + 1,
              price: "200"
            })}
          />
          {
            cart && cart.map((item, itemIndex) => (
              <ul key={itemIndex}>
                <Link to={`/dashboard/${item.id}`}>
                  <li data-testid={'ID-CART-ITEM'}>{`${item.id} || ${item.price}`}</li>
                </Link>
              </ul>
            ))
          }
          <form 
            onSubmit={(event) => {
              event.preventDefault()
              setPaid(!paid)
              return setTimeout(() => history.push('/success-confirmation'), 2000)
            }}
          >
            <label>
              Card Number
              <input type="text" name="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
            </label>
            <label>
              Name
              <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <input 
              type="submit" 
              value={"Pay"} 
              disabled={ cardNumber !== "" && name !== "" ? false : true } 
            />
          </form>
        </div>
      // </React.Suspense>
  );
}

// export default Dashboard;
function mapStateToProps(state) {
  return {
    dashboard: state.dashboard
  };
}

const mapActionsToProps = {
  addItemAction: addItem
};

export default connect(mapStateToProps,mapActionsToProps)(withRouter(Dashboard));