import { useState, useCallback, useEffect } from 'react';
import type { Card } from '../types/card';

const API_URL = import.meta.env.VITE_API_URL || 'https://educapi-v2.onrender.com/card';
const passkey = import.meta.env.VITE_USER_SECRET_PASSKEY || 'Seba704220AN';

const getHeaders = (withBody = false): Record<string, string> => {
  const headers: Record<string, string> = {
    'usersecretpasskey': passkey
  };
  if (withBody) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

export function useCards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, { headers: getHeaders() });
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setCards(data.data);
        }
      } else {
        console.error("Error status:", res.status);
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const addCard = useCallback(async (newCard: Card) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(newCard)
      });
      if (res.ok) {
        await fetchCards();
        return true;
      }
    } catch (error) {
      console.error("Error adding card:", error);
    }
    return false;
  }, [fetchCards]);

  const updateCard = useCallback(async (idCard: number, updatedData: Partial<Card>) => {
    try {
      const res = await fetch(`${API_URL}/${idCard}`, {
        method: 'PATCH',
        headers: getHeaders(true),
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        await fetchCards();
        return true;
      }
    } catch (error) {
      console.error("Error updating card:", error);
    }
    return false;
  }, [fetchCards]);

  const deleteCard = useCallback(async (idCard: number) => {
    try {
      const res = await fetch(`${API_URL}/${idCard}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        await fetchCards();
        return true;
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
    return false;
  }, [fetchCards]);

  return {
    cards,
    loading,
    addCard,
    updateCard,
    deleteCard,
    refreshCards: fetchCards
  };
}
