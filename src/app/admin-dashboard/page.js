'use client';

import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          setMessage('Failed to load users.');
        }
      } catch (error) {
        setMessage('Failed to load users.');
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          setMessage('Failed to load posts.');
        }
      } catch (error) {
        setMessage('Failed to load posts.');
      }
    };

    fetchUsers();
    fetchPosts();
  }, []);

  const handleSaveUser = async (id) => {
    const user = users.find((user) => user.id === id);
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: user.name, role: user.role }),
      });
      if (response.ok) {
        setEditingUserId(null);
      } else {
        setMessage('Failed to update user.');
      }
    } catch (error) {
      setMessage('Failed to update user.');
    }
  };

  const handleSavePost = async (id) => {
    const post = posts.find((post) => post.id === id);
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: post.title,
          content: post.content,
          category: post.category,
          event_time: post.event_time,
        }),
      });
      if (response.ok) {
        setEditingPostId(null);
        setMessage('Post updated successfully.');
      } else {
        setMessage('Failed to update post.');
      }
    } catch (error) {
      setMessage('Failed to update post.');
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setPosts(posts.filter((post) => post.id !== id));
          setMessage('Post deleted successfully.');
        } else {
          setMessage('Failed to delete post.');
        }
      } catch (error) {
        setMessage('Error deleting post.');
      }
    }
  };

  return (
    <div>
      <Header />

      <div className={styles.adminContainer}>
        <h1 className={styles.headingPrimary}>Admin Dashboard</h1>
        {message && <p className={styles.errorMessage}>{message}</p>}
        <h2 className={styles.headingSecondary}>Users</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {editingUserId === user.id ? (
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) =>
                          setUsers(
                            users.map((u) =>
                              u.id === user.id ? { ...u, name: e.target.value } : u
                            )
                          )
                        }
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {editingUserId === user.id ? (
                      <select
                        value={user.role}
                        onChange={(e) =>
                          setUsers(
                            users.map((u) =>
                              u.id === user.id ? { ...u, role: e.target.value } : u
                            )
                          )
                        }
                      >
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td>
                    {editingUserId === user.id ? (
                      <button onClick={() => handleSaveUser(user.id)}>Save</button>
                    ) : (
                      <button onClick={() => setEditingUserId(user.id)}>Edit</button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <h2 className={styles.headingSecondary}>Posts</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Content</th>
              <th>Category</th>
              <th>Event Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan="6">No posts found</td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>
                    {editingPostId === post.id ? (
                      <input
                        type="text"
                        value={post.title}
                        onChange={(e) =>
                          setPosts(
                            posts.map((p) =>
                              p.id === post.id ? { ...p, title: e.target.value } : p
                            )
                          )
                        }
                      />
                    ) : (
                      post.title
                    )}
                  </td>
                  <td>
                    {editingPostId === post.id ? (
                      <textarea
                        value={post.content}
                        onChange={(e) =>
                          setPosts(
                            posts.map((p) =>
                              p.id === post.id ? { ...p, content: e.target.value } : p
                            )
                          )
                        }
                      />
                    ) : (
                      post.content
                    )}
                  </td>
                  <td>
                    {editingPostId === post.id ? (
                      <input
                        type="text"
                        value={post.category}
                        onChange={(e) =>
                          setPosts(
                            posts.map((p) =>
                              p.id === post.id ? { ...p, category: e.target.value } : p
                            )
                          )
                        }
                      />
                    ) : (
                      post.category
                    )}
                  </td>
                  <td>
                    {editingPostId === post.id ? (
                      <input
                        type="datetime-local"
                        value={post.event_time}
                        onChange={(e) =>
                          setPosts(
                            posts.map((p) =>
                              p.id === post.id ? { ...p, event_time: e.target.value } : p
                            )
                          )
                        }
                      />
                    ) : (
                      new Date(post.event_time).toLocaleString()
                    )}
                  </td>
                  <td>
                    {editingPostId === post.id ? (
                      <button onClick={() => handleSavePost(post.id)}>Save</button>
                    ) : (
                      <>
                        <button onClick={() => setEditingPostId(post.id)}>Edit</button>
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
}
