import { useState, useEffect } from 'react';
import { Classmate, Announcement, Memory, Shoutout, Comment } from './types';
import {
  PREDEFINED_CLASSMATES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_MEMORIES,
  INITIAL_SHOUTOUTS
} from './data';

import Login from './components/Login';
import NavBar from './components/NavBar';
import Navigation from './components/Navigation';
import HomeView from './components/HomeView';
import ClassmatesView from './components/ClassmatesView';
import MemoriesView from './components/MemoriesView';
import MyProfileView from './components/MyProfileView';
import WhereAreTheyNowView from './components/WhereAreTheyNowView';
import MessagesView from './components/MessagesView';
import ClassDetailsView from './components/ClassDetailsView';
import SettingsView from './components/SettingsView';

export default function App() {
  // --- Persistent States (with localStorage Fallback) ---
  const [currentUser, setCurrentUser] = useState<Classmate | null>(() => {
    const saved = localStorage.getItem('reunionspace_current_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Clean up legacy session
      if (parsed.name === 'Alex Mercer' || parsed.id === 'A003' || !PREDEFINED_CLASSMATES.some(c => c.id === parsed.id)) {
        return null;
      }
      return parsed;
    }
    return null;
  });

  const [classmates, setClassmates] = useState<Classmate[]>(() => {
    const saved = localStorage.getItem('reunionspace_classmates');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Auto-upgrade if old database schema is loaded
      if (parsed.some((c: any) => c.name === 'Alex Mercer' || c.id === 'A003' || !PREDEFINED_CLASSMATES.some(item => item.id === c.id))) {
        return PREDEFINED_CLASSMATES;
      }
      return parsed;
    }
    return PREDEFINED_CLASSMATES;
  });

  const [memories, setMemories] = useState<Memory[]>(() => {
    const saved = localStorage.getItem('reunionspace_memories');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Auto-upgrade if old names exist
      if (parsed.some((m: any) => m.classmateName === 'Emily Rodriguez' || m.classmateId === 'A015' && m.classmateName !== 'Aleesa Sofea')) {
        return INITIAL_MEMORIES;
      }
      return parsed;
    }
    return INITIAL_MEMORIES;
  });

  const [shoutouts, setShoutouts] = useState<Shoutout[]>(() => {
    const saved = localStorage.getItem('reunionspace_shoutouts');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.some((s: any) => s.senderName === 'Devon Miller')) {
        return INITIAL_SHOUTOUTS;
      }
      return parsed;
    }
    return INITIAL_SHOUTOUTS;
  });

  const [announcements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);

  const [activeTab, setActiveTab] = useState<string>(() => {
    const saved = localStorage.getItem('reunionspace_active_tab');
    return saved || 'home';
  });

  const [notifications, setNotifications] = useState<Array<{ id: string; text: string; time: string; read: boolean }>>([
    { id: 'n-1', text: 'Amar Amali confessed the great hallway balloon prank on the Messages Board!', time: '10m ago', read: false },
    { id: 'n-2', text: 'Aniq Haziq posted a new nostalgic memory of painting the class mural.', time: '1h ago', read: false },
    { id: 'n-3', text: 'Nitis initialized the Elysian K5 physical reunion setup briefing.', time: '1d ago', read: true },
  ]);

  // --- Save states to localStorage ---
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('reunionspace_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('reunionspace_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('reunionspace_classmates', JSON.stringify(classmates));
  }, [classmates]);

  useEffect(() => {
    localStorage.setItem('reunionspace_memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem('reunionspace_shoutouts', JSON.stringify(shoutouts));
  }, [shoutouts]);

  useEffect(() => {
    localStorage.setItem('reunionspace_active_tab', activeTab);
  }, [activeTab]);

  // --- Actions ---
  const handleLoginSuccess = (user: Classmate) => {
    const matchedFromDb = classmates.find((c) => c.id === user.id);
    setCurrentUser(matchedFromDb || user);
    setActiveTab('home');

    const newNotif = {
      id: `n-login-${Date.now()}`,
      text: `Access Granted! Welcome to ReunionSpace, ${user.name}.`,
      time: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('reunionspace_current_user');
  };

  const handleUpdateProfile = (updatedUser: Classmate) => {
    setCurrentUser(updatedUser);
    
    setClassmates((prev) =>
      prev.map((c) => (c.id === updatedUser.id ? updatedUser : c))
    );

    setMemories((prev) =>
      prev.map((mem) =>
        mem.classmateId === updatedUser.id
          ? {
              ...mem,
              classmateName: updatedUser.name,
              avatarGradient: updatedUser.avatarGradient,
              avatarEmoji: updatedUser.avatarEmoji,
            }
          : mem
      )
    );

    const autoShoutout: Shoutout = {
      id: `sh-auto-${Date.now()}`,
      senderId: updatedUser.id,
      senderName: updatedUser.name,
      avatarGradient: updatedUser.avatarGradient,
      avatarEmoji: updatedUser.avatarEmoji,
      content: `Just refreshed my cyber coordinates to "${updatedUser.location}" and role to "${updatedUser.role}". Check out my updated status card!`,
      date: new Date().toISOString(),
    };
    setShoutouts((prev) => [...prev, autoShoutout]);
  };

  const handleAddMemory = (caption: string, gradientValue: string) => {
    if (!currentUser) return;

    const newMemory: Memory = {
      id: `mem-${Date.now()}`,
      classmateId: currentUser.id,
      classmateName: currentUser.name,
      avatarGradient: currentUser.avatarGradient,
      avatarEmoji: currentUser.avatarEmoji,
      imageType: 'gradient',
      imageValue: gradientValue,
      caption: caption,
      date: new Date().toLocaleDateString(),
      likes: 0,
      comments: [],
      likedBy: [],
    };

    setMemories((prev) => [newMemory, ...prev]);

    const newNotif = {
      id: `n-${Date.now()}`,
      text: `${currentUser.name} published a new high school memory. Check it out!`,
      time: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleToggleLike = (memoryId: string) => {
    if (!currentUser) return;

    setMemories((prev) =>
      prev.map((mem) => {
        if (mem.id !== memoryId) return mem;

        const alreadyLiked = mem.likedBy.includes(currentUser.id);
        const updatedLikedBy = alreadyLiked
          ? mem.likedBy.filter((id) => id !== currentUser.id)
          : [...mem.likedBy, currentUser.id];

        return {
          ...mem,
          likedBy: updatedLikedBy,
          likes: updatedLikedBy.length,
        };
      })
    );
  };

  const handleAddComment = (memoryId: string, text: string) => {
    if (!currentUser) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      classmateId: currentUser.id,
      classmateName: currentUser.name,
      classmateAvatarColor: currentUser.avatarGradient,
      content: text,
      date: 'Just now',
    };

    setMemories((prev) =>
      prev.map((mem) => {
        if (mem.id !== memoryId) return mem;
        return {
          ...mem,
          comments: [...mem.comments, newComment],
        };
      })
    );
  };

  const handlePostShoutout = (text: string) => {
    if (!currentUser) return;

    const newShoutout: Shoutout = {
      id: `sh-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      avatarGradient: currentUser.avatarGradient,
      avatarEmoji: currentUser.avatarEmoji,
      content: text,
      date: new Date().toISOString(),
    };

    setShoutouts((prev) => [...prev, newShoutout]);
  };

  const handleSendSalute = (recipientName: string) => {
    if (!currentUser) return;

    const newShoutout: Shoutout = {
      id: `sh-salute-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      avatarGradient: currentUser.avatarGradient,
      avatarEmoji: currentUser.avatarEmoji,
      content: `🥂 Toast Alert! Sent a grand salute to @${recipientName} to celebrate their amazing work and journey! Keep shining!`,
      date: new Date().toISOString(),
    };

    setShoutouts((prev) => [...prev, newShoutout]);
  };

  const handleMarkNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handlePostMemoryQuickAction = () => {
    setActiveTab('memories');
  };

  // --- Render router helper ---
  const renderTabContent = () => {
    if (!currentUser) return null;

    switch (activeTab) {
      case 'home':
        return (
          <HomeView
            user={currentUser}
            classmatesCount={classmates.length}
            memoriesCount={memories.length}
            messagesCount={shoutouts.length}
            announcements={announcements}
            latestMemory={memories[0] || null}
            setActiveTab={setActiveTab}
            onPostMemoryQuick={handlePostMemoryQuickAction}
          />
        );
      case 'classmates':
        return (
          <ClassmatesView
            classmates={classmates}
            currentUser={currentUser}
            onSendSalute={handleSendSalute}
          />
        );
      case 'memories':
        return (
          <MemoriesView
            memories={memories}
            currentUser={currentUser}
            onAddMemory={handleAddMemory}
            onToggleLike={handleToggleLike}
            onAddComment={handleAddComment}
          />
        );
      case 'class-overview':
        return (
          <ClassDetailsView
            classmates={classmates}
            memories={memories}
            onInspectClassmate={() => {
              setActiveTab('classmates');
            }}
          />
        );
      case 'profiles':
        return <MyProfileView user={currentUser} onUpdateProfile={handleUpdateProfile} />;
      case 'where-now':
        return (
          <WhereAreTheyNowView
            classmates={classmates}
            onInspectClassmate={() => {
              setActiveTab('classmates');
            }}
          />
        );
      case 'messages':
        return (
          <MessagesView
            shoutouts={shoutouts}
            currentUser={currentUser}
            onPostShoutout={handlePostShoutout}
          />
        );
      case 'settings':
        return (
          <SettingsView
            user={currentUser}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <div className="text-center py-12 text-gray-400">
            Tab section offline or under development.
          </div>
        );
    }
  };

  if (!currentUser) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div id="reunionspace-app" className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans pb-16 md:pb-0">
      <NavBar
        user={currentUser}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onUpdateProfileClick={() => setActiveTab('profiles')}
        notifications={notifications}
        onMarkNotificationsRead={handleMarkNotificationsRead}
      />

      <div className="flex-1 flex flex-col md:flex-row relative">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full pb-20 md:pb-8">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}