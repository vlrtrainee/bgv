import React from 'react';
import Layout from '../../layout/Layout';
import { editUserRole, searchUser } from '../../store/actions/userActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import requireAuth from '../../hoc/requireAuth';
import { loadMe } from '../../store/actions/authActions';
import { withRouter } from 'react-router-dom';

function Authorize({
    searchUser,
    editUserRole,
    user: { searchProfile },
    loadMe,
    history,
  }) {
    const [username, setusername] = React.useState('');
    function searchUserProfile(){
        searchUser(username,history)
    }
    React.useEffect(()=>{
        console.log("searchProfile::",searchProfile)
    },[searchProfile])
    return (
        <Layout>
            <div>
                <h1>Authorize Users to Roles</h1>
                <input type="text" onChange={(e)=>{setusername(e.target.value)}}/>
                <button onClick={searchUserProfile}>Search</button>
                {
                    searchProfile && (
                        <div>
                            <h1>{searchProfile && searchProfile.email}</h1>
                            <span className="label">Role: </span>
                            <span className="info">{searchProfile.role}</span>
                            {searchProfile.role!=='HR' && (<button onClick={()=>{editUserRole(searchProfile.id,'HR')}}>Approve as HR</button>)}
                            {searchProfile.role!=='VERIFIER' && (<button onClick={()=>{editUserRole(searchProfile.id,'VERIFIER')}}>Approve as VERIFIER</button>)}
                            {searchProfile.role!=='USER' && (<button onClick={()=>{editUserRole(searchProfile.id,'USER')}}>Approve as USER</button>)}
                        </div>
                    )
                }
            </div>
        </Layout>
    );
}
const mapStateToProps = (state) => ({
    user: state.user,
    auth: state.auth,
  });
  
export default compose(
    requireAuth,
    withRouter,
    connect(mapStateToProps, { searchUser,editUserRole, loadMe     }),
  )(Authorize);