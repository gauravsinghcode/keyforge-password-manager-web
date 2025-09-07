from django.shortcuts import render, redirect
from .forms import RegisterForm, PasswordForm
from django.contrib import messages

def home(request):

    features = {
        "Encrypted Login Credentials": '“Your gateway is sealed in cryptography, like a lock only you can wield the key for.”',
        "Safe Password Reset & Recovery": '“Lost your key? The forge rekindles a new one through secure email verification.”',
        "View, Store, Search & Delete Passwords": '“Your vault, your rules—organize, sharpen, and discard keys with blacksmith’s control.”',
        "Random Password Generator": '“Strike new keys in seconds—crafted with symbols, numbers, and steel-like strength.”',
        "Two-Factor Authentication?": '“A second layer of armor—because even the strongest blade deserves a shield.”',
        "Free, Open Source & Non-Profit": '“Forged in freedom, shared for all—because true security isn’t locked behind profit.”'
    }

    steps = {
        1 : ["Create Your Vault", "Sign up and forge your personal vault with a unique encryption key."],
        2 : ["Add & Encrypt Passwords", "Every password you store is sealed with zero-knowledge encryption."],
        3 : ["Access Anywhere, Securely", "Log in with your credentials and unlock your vault—only you hold the key."],
        4 : ["Reforge with 2FA", "Add an extra shield of protection with two-factor authentication."],
        5 : ["Recover Safely", "Lost a key? Regain access securely through verified recovery."]
    }

    securityOptions = {
        "Zero-Knowledge Architecture" :["ZeroKnowledge.png", "Your passwords are yours alone. Even we can’t see inside your vault."],
        "Strong Cryptography" : ["Crypto.png", "AES/Fernet encryption and bcrypt hashing forge unbreakable digital locks."],
        "Two-Factor Protection" : ["2FASecure.png", "An extra shield of security for peace of mind."],
        "Safe Recovery" : ["ResetSecure.png", "Recover access only through verified and secure channels."],
        "Open Source & Transparent" : ["OpenSourceSecure.png", "Our forge is open for inspection—no hidden fires, only trust."]
    }

    faqOptions = {
        "Is KeyForge free to use?": "Yes. KeyForge is completely free, open-source, and non-profit. No hidden fees, no premium lockouts.",
        "Can KeyForge see my passwords?": "No. Thanks to zero-knowledge encryption, only you can unlock your vault. We never see or store your secrets.",
        "What happens if I forget my master password?": "You can reset it securely via your registered email. Without recovery setup, even we cannot access your data.",
        "How strong is the encryption?": "Passwords are protected with advanced cryptography (bcrypt + AES/Fernet). It’s like forging locks of steel.",
        "Does KeyForge support Two-Factor Authentication?": "Yes. 2FA adds a second layer of armor, keeping your vault safe even if your password is compromised.",
        "Can I back up or export my passwords?": "Yes. You can create secure offline backups or import/export encrypted data when needed.",
    }


    return render(request, 'main/home.html', {"features": features, "steps": steps, "securityOptions": securityOptions, "faqOptions": faqOptions})


def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            messages.success(request, "Account created successfully. Please log in to access your vault.")
            return redirect('login')
    else:
        form = RegisterForm()
    
    return render(request, 'main/signup.html', {'form': form})


def dashboard(request):
    if request.method == "POST":
        form = PasswordForm(request.POST)
        print(form.errors)
        if form.is_valid():
            entry = form.save(commit=False)
            entry.user = request.user
            entry.save()

    else:
        form = PasswordForm()

    return render(request, 'main/dashboard.html', {'form': form})