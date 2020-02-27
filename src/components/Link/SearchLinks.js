import React, { useContext, useEffect, useState } from "react"
import FirebaseContext from "./../../firebase/context"
import LinkItem from "./LinkItem"

function SearchLinks() {
  const { firebase } = useContext(FirebaseContext)
  const [filteredLinks, setFilteredLinks ] = useState([])
  const [filter, setFilter] = useState("")
  const [links, setLinks] = useState("")

  useEffect(() => {
    getInitialLinks()
  }, [])

  function getInitialLinks() {
    firebase.db.collection("links").get().then(snapshop => {
      const links = snapshop.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      setLinks(links)
    })
  }
  const handleSearch = event => {
    console.log("filteredLinks", filteredLinks)
    event.preventDefault()
    const query = filter.toLowerCase()
    const matchedLinks = links.filter(link => {
      return (
          (link && link.description && link.description.toLowerCase().includes(query)) || 
          (link && link.url && link.url.toLowerCase().includes(query)) ||
          (link && link.postedBy && link.postedBy.name && link.postedBy.name.toLowerCase().includes(query))
      )
    })
    setFilteredLinks(matchedLinks)
  }
  const onChangeHandle = event => {
    setFilter(event.target.value)
  }
  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          Search <input onChange={onChangeHandle} />
          <button>GO</button>
        </div>
      </form>
      {filteredLinks.map((filteredLink, index) => (
        <LinkItem 
          key={filteredLink.id}
          showCount={false}
          link={filteredLink}
          index={index}
        />
      ))}
    </div>
  )
}

export default SearchLinks;
