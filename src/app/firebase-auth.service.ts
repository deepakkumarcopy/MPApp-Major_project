import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, Subject, from } from "rxjs";
import { Platform } from "@ionic/angular";
import { User, auth } from "firebase/app";
import { ProfileModel } from "./profile/profile.model";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase";

@Injectable()
export class FirebaseAuthService {
	currentUser: User;
	savingsList = [];
	detailList = [];
	pieParam: any;
	TotalAmount: any;
	userProviderAdditionalInfo: any;
	userid: any;
	redirectResult: Subject<any> = new Subject<any>();

	constructor(
		public angularFire: AngularFireAuth,
		public platform: Platform,
		private firestore: AngularFirestore
	) {
		this.angularFire.onAuthStateChanged((user) => {
			// this.setUserid(user.email);
			if (user) {
				// User is signed in.
				this.currentUser = user;
			} else {
				// No user is signed in.
				this.currentUser = null;
			}
		});

		// when using signInWithRedirect, this listens for the redirect results
		this.angularFire.getRedirectResult().then(
			(result) => {
				console.log("RESULT", result);
				// result.credential.accessToken gives you the Provider Access Token. You can use it to access the Provider API.
				if (result.user) {
					console.log("RUSER", result.user);
					this.setProviderAdditionalInfo(result.additionalUserInfo.profile);
					this.currentUser = result.user;
					this.redirectResult.next(result);
				}
			},
			(error) => {
				this.redirectResult.next({ error: error.code });
			}
		);
	}

	getRedirectResult(): Observable<any> {
		return this.redirectResult.asObservable();
	}

	setProviderAdditionalInfo(additionalInfo: any) {
		this.userProviderAdditionalInfo = { ...additionalInfo };
		this.userid = additionalInfo.email;
	}

	public getProfileData() {
		const userModel = new ProfileModel();
		let providerData: any = this.currentUser.providerData[0];

		if (this.userProviderAdditionalInfo) {
			providerData = { ...providerData, ...this.userProviderAdditionalInfo };
		}

		// Default imgs are too small and our app needs a bigger image
		switch (providerData.providerId) {
			case "facebook.com":
				userModel.image = providerData.photoURL + "?height=400";
				break;
			case "password":
				userModel.image =
					"https://s3-us-west-2.amazonaws.com/ionicthemes/otros/avatar-placeholder.png";
				break;
			case "twitter.com":
				userModel.image = providerData.photoURL.replace("_normal", "_400x400");
				break;
			case "google.com":
				userModel.image = providerData.photoURL.split("=")[0];
				break;
			default:
				userModel.image = providerData.photoURL;
		}
		userModel.name = providerData.name || providerData.displayName || "What's your name?";
		userModel.role = "How would you describe yourself?";
		userModel.description = providerData.description || "Watch your finances now with HSAJ MONEY SAVING APP!";
		userModel.phoneNumber = providerData.phoneNumber || "-";
		userModel.email = providerData.email || "Where can I send you emails?";
		userModel.provider = providerData.providerId !== "password" ? providerData.providerId : "Credentials";

		return userModel;
	}

	// Get the currently signed-in user
	getLoggedInUser() {
		return this.currentUser;
	}

	signOut(): Observable<any> {
		return from(this.angularFire.signOut());
	}

	signInWithEmail(
		email: string,
		password: string
	): Promise<auth.UserCredential> {
		this.userid = email;
		// this.setUserid(email);
		return this.angularFire.signInWithEmailAndPassword(email, password);
	}

	signUpWithEmail(
		email: string,
		password: string
	): Promise<auth.UserCredential> {
		return this.angularFire.createUserWithEmailAndPassword(email, password);
	}

	socialSignIn(providerName: string, scopes?: Array<string>): Promise<any> {
		const provider = new auth.OAuthProvider(providerName);
		console.log("Social", provider);

		console.log("Pname", providerName);

		// add any permission scope you need
		if (scopes) {
			scopes.forEach((scope) => {
				provider.addScope(scope);
			});
		}

		if (this.platform.is("desktop")) {
			return this.angularFire.signInWithPopup(provider);
		} else {
			// web but not desktop, for example mobile PWA
			return this.angularFire.signInWithRedirect(provider);
		}
	}

	signInWithFacebook() {
		const provider = new auth.FacebookAuthProvider();
		// const scopes = ['user_birthday'];
		console.log("Facebook", provider);
		return this.socialSignIn(provider.providerId);
	}

	signInWithGoogle() {
		const provider = new auth.GoogleAuthProvider();
		const scopes = ["profile", "email"];
		console.log("Google scope", scopes);
		console.log("Google provider", provider);

		return this.socialSignIn(provider.providerId, scopes);
	}

	signInWithTwitter() {
		const provider = new auth.TwitterAuthProvider();
		return this.socialSignIn(provider.providerId);
	}
	details(details) {
		this.detailList = details;
		console.log(this.detailList);
	}
	//create new saving in firebase
	create_savings(savingType, record) {
		return this.firestore
			.collection(this.userid)
			.doc(savingType)
			.set(record, { merge: true });
	}
	//read the existing savings from firebase
	read_savings() {
		return this.firestore.collection(this.userid).snapshotChanges();
	}
	//updating savings in the database
	update_saving(recordID, record) {
		this.firestore.doc(this.userid + "/" + recordID).update(record);
	}
	//deleting a savings from the firebase
	delete_saving(record_id) {
		let path = this.userid + "/" + record_id;
		console.log("record_id", record_id);
		this.firestore.doc(path).delete();
	}
	//adding the amount in the firebase that user saved
	add_saving_amount(recordID, record) {
		return this.firestore
			.collection(this.userid)
			.doc(recordID)
			.collection("AmountSaved")
			.add(record);
	}
	//read the existing savings from firebase and send them to pie chart or progress bar
	read_saving_by_month(data) {
		return this.firestore
			.collection(this.userid)
			.doc(data.id)
			.collection("AmountSaved")
			.snapshotChanges();
	}
	//reading from firebase and arranging them in descending order of timestamp
	sortingDesc() {
		return this.firestore
			.collection(this.userid, (ref) => ref.where("monthflag", "==", false))
			.snapshotChanges();
	}
	//reading from firebase and arranging them in ascending order of timestamp

	sortingAsc() {
		return this.firestore
			.collection(this.userid, (ref) => ref.where("monthflag", "==", true))
			.snapshotChanges();
	}

	async getList() {
		let unsortedList = [];
		const snapshot = await firebase.firestore().collection(this.userid).get();
		unsortedList = snapshot.docs.map((doc) => {
			let listObject = doc.data();
			listObject.id = doc.id;
			return listObject;
		});

		return unsortedList;
	}
	/*reading values form firebase and calculating the 
	total amount saved by the user till date i.e. the sum*/
	async totalSavedAmount(record, userDetails) {
		let sum = 0;

		let amountSavedDocs = [];
		const snapshot = await firebase
			.firestore()
			.collection(this.userid)
			.doc(userDetails.id)
			.collection("AmountSaved")
			.get();

		amountSavedDocs = snapshot.docs.map((doc) => doc.data());
		for (let i in amountSavedDocs) {
			sum += +amountSavedDocs[i].amountSaved;
		}
		const totalAmountToBeSaved = await firebase
			.firestore()
			.collection(this.userid)
			.doc(userDetails.id)
			.get()
			.then((doc) => {
				return doc.data();
			});
		let per = (sum / +totalAmountToBeSaved.amount) * 100;

		if (sum === +totalAmountToBeSaved?.amount) {
			return "goal achieved";
		} else if (sum > totalAmountToBeSaved?.amount) {
			return "goal exceeded";
		} else if (per >= 80 && per < 100) {
			return "nearing the goal";
		} else return "not achieved";
	}
}
