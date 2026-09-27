"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
    CheckCircle,
    FileText,
    Home,
    ChevronRight,
    Clock,
    Mail,
} from "lucide-react";

export default function ApplicationSuccessPage() {
    const [referenceNumber, setReferenceNumber] = useState<string>("");

    useEffect(() => {
        setReferenceNumber(
            `APP-${Math.floor(10000000 + Math.random() * 90000000)}`
        );
    }, []);

    return (
        <main className="min-h-screen bg-cloud flex items-center justify-center px-6 py-16">
            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-card shadow-xl p-8 md:p-12 text-center border border-gray-100">

                    <div className="bg-success/10 rounded-full p-6 w-fit mx-auto mb-6 animate-fade-in-up">
                        <CheckCircle className="w-16 h-16 text-success" />
                    </div>

                    <h1 className="font-display text-3xl md:text-4xl font-bold text-navy">
                        Application Submitted!
                    </h1>
                    <p className="text-ink/70 mt-4 leading-relaxed max-w-lg mx-auto">
                        Thank you for submitting your application. Our team will review it and
                        get back to you within 3-5 business days.
                    </p>

                    <div className="bg-cloud rounded-card p-4 mt-8 inline-block">
                        <p className="text-xs text-ink/60 uppercase tracking-wider">Reference Number</p>
                        <p className="font-display font-bold text-navy text-lg mt-1">
                            {referenceNumber || "Generating..."}
                        </p>
                    </div>

                    <div className="mt-8 p-4 bg-gold/5 border border-gold/20 rounded-card">
                        <Clock className="w-5 h-5 text-gold mx-auto mb-2" />
                        <p className="text-ink/80 text-sm">
                            You'll receive an email confirmation shortly. You can track your application
                            status in your dashboard.
                        </p>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3 justify-center">
                        <Link
                            href="/dashboard/applications"
                            className="btn-lift bg-gold text-ink font-semibold px-6 py-3.5 rounded-input hover:bg-gold/90 transition-colors shadow-lg flex items-center gap-2"
                        >
                            <FileText className="w-5 h-5" />
                            Track Application
                        </Link>
                        <Link
                            href="/assistance"
                            className="btn-lift border-2 border-navy/20 text-navy font-semibold px-6 py-3.5 rounded-input hover:bg-navy/5 transition-colors flex items-center gap-2"
                        >
                            Browse Programs
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <p className="text-ink/60 text-sm flex items-center justify-center gap-2">
                            <Mail className="w-4 h-4" />
                            Questions? Email us at support@dhklift.org
                        </p>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-ink/60 hover:text-navy transition-colors text-sm"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}