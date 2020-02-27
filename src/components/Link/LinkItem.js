import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom"
import { getDomain } from "./../../helpers/getDomain"
import distanceInWordsToNow from "date-fns/distance_in_words_to_now"
import FirebasContext from "./../../firebase/context"

function LinkItem({ history, index, link, showCount }) {
  const shrinkedUrl = getDomain(link.url)
  const formattedDate = distanceInWordsToNow(link.created)
  const { firebase, user } = useContext(FirebasContext)
  const postedByAuthUser = (user && user.uid) === (link && link.postedBy && link.postedBy.id)

  const handleVote = () => {
    if(!user) {
      history.push("/login")
    } else {
      const voteRef = firebase.db.collection("links").doc(link.id)
      voteRef.get().then(doc => {
        if(doc.exists) {
          const previousVotes = doc.data().votes
          const newVote = { votedBy: { id: user.uid, name: user.displayName }}
          const updatedVotes = [...previousVotes, newVote]
          const voteCount = updatedVotes.length
          voteRef.update({ votes: updatedVotes, voteCount })
        }
      })
    }
  }
  const handleDelete = () => {
    const deleteRef = firebase.db.collection("links").doc(link.id)
    deleteRef.delete().then(() => {
      console.log(`Document with id ${link.id} deleted`)
    }).catch(err => {
      console.error("Error deleting document:", err )
    })
  }
  console.log("postedByAuthUser", postedByAuthUser)
  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}.</span>}
        <div className="vote-button" onClick={handleVote}>▲</div>
      </div>
      <div className="ml1">
        <div>
          <a href={link.url} className="black no-underline">{link && link.description}</a> <span className="link">({shrinkedUrl})</span>
        </div>
        <div className="f6 lh-copy gray">
          {link && link.voteCount} votes by {link && link.postedBy && link.postedBy.name} {formattedDate}
          {" | "}
          <Link to={`/link/${link.id}`}>
            {link && link.comments && link.comments.length > 0 
            ? `${link.comments.length} comments` : "discuss"}
          </Link>
          {postedByAuthUser && (
            <>
            {" | "}
            <span className="delete-button" onClick={handleDelete}>Delete</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default withRouter(LinkItem);
