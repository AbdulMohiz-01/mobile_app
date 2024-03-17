export interface ServerResult {
    class: string;
    confidence: number;
    predictons: number[];
}

export interface DiabeticRetinopathyResult {
    description: string;
    details: {
        short_description: string;
        stage: string;
        precautions: string;
    };
}

export interface DiabeticRetinopathySeverity {
    [key: string]: DiabeticRetinopathyResult;
}

export const diabeticRetinopathyData: DiabeticRetinopathySeverity = {
    "0": {
        description: "No Diabetic Retinopathy",
        details: {
            short_description: "No signs of diabetic retinopathy.",
            stage: "Your eyes are healthy with no signs of damage from diabetes.",
            precautions: "It's important to continue regular eye check-ups with your doctor to make sure your eyes stay healthy."
        }
    },
    "1": {
        description: "Mild Diabetic Retinopathy",
        details: {
            short_description: "Early signs of diabetic retinopathy.",
            stage: "Your eyes show some minor damage from diabetes, but it's not severe.",
            precautions: "To protect your eyes, it's important to keep your blood sugar levels under control and to have regular check-ups with your eye doctor. They may suggest changes in your diet or medication to help manage your diabetes."
        }
    },
    "2": {
        description: "Moderate Diabetic Retinopathy",
        details: {
            short_description: "Moderate stage of diabetic retinopathy.",
            stage: "There is some noticeable damage to the blood vessels in your eyes due to diabetes, and your retina may be swollen.",
            precautions: "To prevent further damage to your eyes, it's crucial to closely manage your blood sugar levels. Your doctor may also recommend controlling your blood pressure and cholesterol. Regular eye exams are important, and your doctor may suggest treatments like laser therapy or injections to protect your vision."
        }
    },
    "3": {
        description: "Severe Diabetic Retinopathy",
        details: {
            short_description: "Advanced stage of diabetic retinopathy.",
            stage: "Your eyes have experienced significant damage from diabetes, including bleeding and scar tissue formation.",
            precautions: "Seek immediate medical attention as your eyesight may be at risk. It's essential to tightly manage your blood sugar levels, blood pressure, and cholesterol. Your doctor may recommend advanced treatments such as surgery or injections to prevent further vision loss."
        }
    },
    "4": {
        description: "Proliferative Diabetic Retinopathy",
        details: {
            short_description: "Most severe stage of diabetic retinopathy.",
            stage: "New abnormal blood vessels have formed in your eyes due to diabetes, which can lead to serious vision problems.",
            precautions: "Immediate medical intervention is necessary to protect your vision. Regular eye exams are crucial, and your doctor may recommend treatments like laser surgery or injections to prevent vision loss and preserve your eyesight."
        }
    }
};