
"use server";

import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export type GeneralSettingsData = {
    companyName?: string;
    companyEmail?: string;
    companyAddress?: string;
};

const SETTINGS_DOC_ID = 'general';

export const saveSettings = async (settings: GeneralSettingsData): Promise<void> => {
    try {
        const settingsRef = doc(db, 'settings', SETTINGS_DOC_ID);
        await setDoc(settingsRef, settings, { merge: true });
    } catch (error) {
        console.error("Error saving settings: ", error);
        throw new Error("Failed to save settings.");
    }
};

export const getSettings = async (): Promise<GeneralSettingsData | null> => {
    try {
        const settingsRef = doc(db, 'settings', SETTINGS_DOC_ID);
        const docSnap = await getDoc(settingsRef);

        if (docSnap.exists()) {
            return docSnap.data() as GeneralSettingsData;
        } else {
            // Return default values if no settings document exists
            return {
                companyName: "WebWizFlow Inc.",
                companyEmail: "contact@webwizflow.com",
                companyAddress: "123 Innovation Drive, Tech City"
            };
        }
    } catch (error) {
        console.error("Error fetching settings: ", error);
        // In case of error, return default values to prevent crash
        return {
            companyName: "WebWizFlow Inc.",
            companyEmail: "contact@webwizflow.com",
            companyAddress: "123 Innovation Drive, Tech City"
        };
    }
};
