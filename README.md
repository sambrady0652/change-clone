# Cause
*by Sam Brady, Stedman Houston, Ben Anderson, and Zachery Haley * | [Live Site](https://cause-change.herokuapp.com/)

### Table of Contents
- [The User Interface](https://github.com/sambrady0652/change-clone#the-user-interface)
- [Architecture & Technologies](https://github.com/sambrady0652/change-clone#architecture-&-technologies)
- [The FrontEnd](https://github.com/sambrady0652/change-clone#the-frontend)
- [The Backend](https://github.com/sambrady0652/change-clone#the-backend)


## The User Interface
Cause uses the React.js framework with Grommet CSS to manage user interactions client side as they signup for an account and then create/update/sign/search petitions. 
  
![A pic of Change](https://64.media.tumblr.com/fbaf2c437d0ae4067ac4963c8ac06108/3f551c8180e90729-fc/s1280x1920/b77256580cc21cd70e98fd3a9eb7042b88f2815b.png)

![Another pic of Change](https://64.media.tumblr.com/387966473953fb8b33d2a214d4974394/3f551c8180e90729-be/s1280x1920/f22506f0bec82f550804c809b328ace97e78ad23.png)

## Architecture & Technologies

Our application was a group led full Full Stack application that uses a React.js and Redux to keep track of users and what petitions they own and have access to update and uses a Flask back end server that makes queries and updates to the SQL database through the SQL-Alchemy ORM regarding users and their petitions.

## The FrontEnd

The single page application uses React and Redux to create stateful interactions with with the user.  The CSS is made my the Grommet library as it allowed us to replicate the look and feel of the original Change website. 
### Frontend Technologies:

#### React & Redux
The use of React's hooks and Redux's store was instrumental in allowing us to keep track of petitions and who had acess to certain priveleges regarding them. This also allowed to us to create a search component that would allow users to query the database through their own input.
```
const Search = () => {
  const { petitions } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPetitions())
  }, [dispatch])

  let array = []
  for (let key in petitions) {
    array.push(petitions[key])
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [errors, setErrors] = useState([])
  const [flag, setFlag] = useState(false)




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm === '') {
      return
    }
    setSearchResults([])
    setErrors([])
    let tempArray = array.filter(petition => petition.header.toLowerCase().includes(searchTerm.toLowerCase()))
    if (tempArray.length === 0) {
      setErrors(['No results were found from your search'])
      setSearchResults([])
      setFlag(true)
    } else {
      setSearchResults([...tempArray])
    }

  }


  let errorsToRender;
  if (errors[0] !== null) {
    errorsToRender = errors.map(error => {
      return <div style={{ color: 'red', fontWeight: 'bold', font: 20 }} key={error} >{error}</div>
    })
  } else {
    errorsToRender = <div></div>
  }


  if (searchResults.length === 0 && !flag) {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="control">
            <div>Search</div>
            <div style={{ display: "flex" }}>
              <input className="input" name='search_term' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" placeholder="Search petitions" />
              <button className="button is-link" onClick={handleSubmit}>Search</button>
            </div>
            <div>{errorsToRender}</div>
            <div style={{ justifyContent: "center" }}>
              {array.map(ele =>
                makeCard(ele))}
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="control">
            <div>Search</div>
            <div style={{ display: "flex" }}>
              <input className="input" name='search_term' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} type="text" placeholder="Search petitions" />
              <button className="button is-link" onClick={handleSubmit}>Search</button>
            </div>
            <div>{errorsToRender}</div>
            <div>
              {searchResults.map(ele =>
                makeCard(ele))}
            </div>
          </div>
        </div>
      </>
    )
  }
}

```


 
## The BackEnd
As this was a form driven website, the backend was the backbone of the entire website managing a very extensive database that would constantly need to be updated and queried. 

#### Flask
We used Flask because of its lightweight nature allowing us to hit the ground running as we worked together without having to add unnecessary complications from some of the other more heavy duty Python frameworks.

```
@bp.route('/<int:petition_id>/signatures', methods=['GET', 'POST'])
def petiton_signatures(petition_id):
    if request.method == 'GET':
        signatures = Signature.query.filter(
            Signature.petition_id == petition_id).all()
        return {str(signature.id): signature.to_dict() for signature in signatures}
    if request.method == 'POST':
        user_id = request.json.get('user_id')
        message = request.json.get('message')
        new_sig = Signature(user_id=user_id, petition_id=petition_id, message=message)
        db.session.add(new_sig)
        db.session.commit()

        all_sigs_count = Signature.query.filter(Signature.petition_id == petition_id).count()
        
        petition = Petition.query.filter(Petition.id == petition_id).one()
        petition.current = all_sigs_count
        db.session.add(petition)
        db.session.commit()

        return new_sig.to_dict()
 ```

#### SQL-Alchemy 
We used the SQL Alchemy database to store petitions, updates, and users.

#### Amazon Web Services
We used Amazon's cloud services to allow users to host photos of both their petitions and related updates.


 ### Docker
 We used a docker container and eventlet to create a container for the environment to automate consistent deployment of the application.
  
