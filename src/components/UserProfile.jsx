import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { useRouter } from "next/router";
import axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import useSelectedItemStore from "../../useSelectedItemStore";

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

  const presetKey = "a2at9e3t";
  const cloudName = "dpkdk3qog";
  const router = useRouter();

  function formatDateTime(dateTimeString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(dateTimeString).toLocaleDateString(undefined, options);
  }

  //Stored Saved Coins using Zustand =>
  const selectedItems = useSelectedItemStore((state) => state.selectedItems);
  console.log("Zustand Array ==>", selectedItems);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: user, error } = await supabase.auth.getUser();
        if (error) {
          throw new Error(error.message);
        } else {
          setUserProfile(user);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    async function uploadImage() {
      if (image && userProfile) {
        try {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", presetKey);

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
          );

          if (res.data.url) {
            const dataToAdd = {
              imgLink: res.data.url,
            };

            const docRef = await addDoc(
              collection(db, `${userProfile.user.id}`),
              dataToAdd
            );

            console.log("Document written with ID: ", docRef.id);
          } else {
            console.error("Error uploading image to Cloudinary");
          }
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }

    uploadImage();
  }, [image, userProfile]);

  function handleUpload(event) {
    const file = event.target.files[0];
    setImage(file);
  }

  //Download Database Image Data
  useEffect(() => {
    const fetchPosts = async () => {
      if (!userProfile) {
        return;
      }

      const q = query(collection(db, `${userProfile.user.id}`));

      try {
        const querySnapshot = await getDocs(q);
        const postsData = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          postsData.push({ id: doc.id, data: doc.data() });
        });

        console.log("All Posts Data:", postsData); // Log the entire postsData array

        // Set the state with the entire postsData array
        setPosts(postsData[postsData.length - 1]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userProfile]);

  // Log the posts state whenever it changes
  useEffect(() => {
    console.log("Profile Pic", posts);
  }, [posts]);

  return (
    <div>
      {userProfile ? (
        <div className="userprofile-container">
          <p className="profile-title">User Profile</p>
          {posts && posts.data && posts.data.imgLink !== undefined ? (
            <img
              className="profile-pic"
              alt="IconPic"
              src={posts.data.imgLink}
            />
          ) : (
            <img
              className="profile-pic"
              alt="IconPic"
              src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
            />
          )}

          <div className="input-container">
            <label htmlFor="file-input" className="custom-button">
              Upload Image
            </label>
            <input
              type="file"
              id="file-input"
              onChange={handleUpload}
              name="image"
              className="hidden-input"
            />
          </div>
          <p className="profile-acc">Account Details</p>
          <div className="det-container">
            <div className="profile-acc-details">
              <p>Name: {userProfile.user.email}</p>
            </div>
            <div className="profile-acc-details">
              <p>Joined: {formatDateTime(userProfile.user.created_at)}</p>
            </div>
          </div>
          {/* In development */}
          <p className="pref-assets">Preferred Assets</p>
          {/* <p className="nosaved">No Saved Assets</p> */}
          {selectedItems.length === 0 ? (
            <p className="nosaved">No Saved Assets</p>
          ) : (
            <p>Are Items Selected</p>
          )}
        </div>
      ) : (
        <p>Login Now!</p>
      )}
    </div>
  );
}

export default UserProfile;
